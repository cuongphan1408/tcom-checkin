#!/usr/bin/env python2
#
# Copyright 2015-2016 Carnegie Mellon University
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import argparse
import cv2
import numpy as np
import os
import random
import shutil

import openface
import openface.helper
from openface.data import iterImgs

fileDir = os.path.dirname(os.path.realpath(__file__))
modelDir = os.path.join(fileDir, '..', 'models')
dlibModelDir = os.path.join(modelDir, 'dlib')
openfaceModelDir = os.path.join(modelDir, 'openface')


def write(vals, fName):
    if os.path.isfile(fName):
        print("{} exists. Backing up.".format(fName))
        os.rename(fName, "{}.bak".format(fName))
    with open(fName, 'w') as f:
        for p in vals:
            f.write(",".join(str(x) for x in p))
            f.write("\n")


def computeMeanMain(args):
    align = openface.AlignDlib(args.dlibFacePredictor)

    imgs = list(iterImgs(args.inputDir))
    if args.numImages > 0:
        imgs = random.sample(imgs, args.numImages)

    facePoints = []
    for img in imgs:
        rgb = img.getRGB()
        bb = align.getLargestFaceBoundingBox(rgb)
        alignedPoints = align.align(rgb, bb)
        if alignedPoints:
            facePoints.append(alignedPoints)

    facePointsNp = np.array(facePoints)
    mean = np.mean(facePointsNp, axis=0)
    std = np.std(facePointsNp, axis=0)

    write(mean, "{}/mean.csv".format(args.modelDir))
    write(std, "{}/std.csv".format(args.modelDir))

    # Only import in this mode.
    import matplotlib as mpl
    mpl.use('Agg')
    import matplotlib.pyplot as plt

    fig, ax = plt.subplots()
    ax.scatter(mean[:, 0], -mean[:, 1], color='k')
    ax.axis('equal')
    for i, p in enumerate(mean):
        ax.annotate(str(i), (p[0] + 0.005, -p[1] + 0.005), fontsize=8)
    plt.savefig("{}/mean.png".format(args.modelDir))

def augmentImage(img, imgDir):

    augList = [(img,imgDir)]    

    #flipping image
    img_flip = cv2.flip(img,1)
    filename = imgDir[:-4]+"_flip.png"
    augList.append((img_flip,filename))
    #cv2.imwrite(imgName[:-4]+"_flip1.png",flipped_img)

    # #rotate image
    # num_rows, num_cols = img.shape[:2]
    # rotation_matrix = cv2.getRotationMatrix2D((num_cols/2, num_rows/2), 15, 1)
    # img_rotation = cv2.warpAffine(img, rotation_matrix, (num_cols, num_rows))
    # filename = imgDir[:-4]+"_rotation15.png"
    # augList.append((img_rotation,filename))

    return augList


def alignMain(inputDir,outputDir,landmarks,dlibFacePredictor,size):
    openface.helper.mkdirP(outputDir)

    imgs = list(iterImgs(inputDir))

    # Shuffle so multiple versions can be run at once.
    random.shuffle(imgs)

    landmarkMap = {
        'outerEyesAndNose': openface.AlignDlib.OUTER_EYES_AND_NOSE,
        'innerEyesAndBottomLip': openface.AlignDlib.INNER_EYES_AND_BOTTOM_LIP
    }
    if landmarks not in landmarkMap:
        raise Exception("Landmarks unrecognized: {}".format(landmarks))

    landmarkIndices = landmarkMap[landmarks]

    align = openface.AlignDlib(dlibFacePredictor)

    nFallbacks = 0
    for imgObject in imgs:
        print("=== {} ===".format(imgObject.path))
        outDir = os.path.join(outputDir, imgObject.cls)
        openface.helper.mkdirP(outDir)
        outputPrefix = os.path.join(outDir, imgObject.name)
        imgName = outputPrefix + ".png"

        if os.path.isfile(imgName):
            print("  + Already found, skipping.")
        else:
            rgb = imgObject.getRGB()
            #rgb = cv2.imread(imgObject.path)
            augmentList = augmentImage(rgb, imgName)
            for img in augmentList:
                augImg = img[0]
                augDir = img[1]

                
                if augImg is None:
                    print("  + Unable to load.")
                    outRgb = None
                else:
                    outRgb = align.align(size, augImg, landmarkIndices=landmarkIndices)                           
                    if outRgb is None:
                        print("  + Unable to align.")           

                if outRgb is not None:
                    print("  + Writing aligned file to disk.")
                    outBgr = cv2.cvtColor(outRgb, cv2.COLOR_RGB2BGR)
                    cv2.imwrite(augDir, outBgr)
