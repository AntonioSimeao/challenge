import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import axios from 'axios';
import { statSync } from 'fs';
const sharp = require('sharp');
const { ExifTool } = require('exiftool-vendored');
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

import {
  ImageMetadata,
  ImageMetadataDocument,
} from './schemas/image-metadata.schema';

@Controller('image')
export class ImagesController {
  constructor(
    @InjectModel(ImageMetadata.name)
    private imageMetadataModel: Model<ImageMetadataDocument>,
  ) {}

  @Post('/save')
  async downloadImage(@Body() body: { imageUrl: string; compress: number }) {
    try {
      const imageUrl = body.imageUrl.split('?')[0];
      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
      });
      const imageId = uuidv4();
      const imageBuffer = Buffer.from(response.data, 'binary');
      const imagesDir = path.join(
        __dirname,
        '..',
        '..',
        'public',
        'Downloadedimages',
      );
      const imagePath = path.join(imagesDir, `${imageId}.jpg`);
      const thumbnailPath = path.join(imagesDir, `${imageId}_thumb.jpg`);

      // Salvar imagem original
      await sharp(imageBuffer).toFile(imagePath);

      // Extrair  EXIF
      const exiftool = new ExifTool();
      const exifData = await exiftool.read(imagePath);
      const metadata = exifData[0];

      // Verificar se a propriedade CreateDate está definida
      const createdDate = metadata?.CreateDate || '';

      // Criar versão reduzida da imagem, se necessário
      const imageDimensions = await sharp(imageBuffer).metadata();
      let thumbnailDimensions = null;

      if (imageDimensions.width > 720 || imageDimensions.height > 720) {
        await sharp(imageBuffer).resize(720, 720).toFile(thumbnailPath);

        thumbnailDimensions = await sharp(thumbnailPath).metadata();
      }

      // Salvar metadados no MongoDB
      const imageMetadata = new this.imageMetadataModel({
        imageId,
        filename: `${imageId}.jpg`,
        fileSize: statSync(imagePath).size,
        mimeType: metadata?.MIMEType || '',
        width: imageDimensions.width,
        height: imageDimensions.height,
        createdDate,
        modifiedDate: metadata?.ModifyDate || '',
      });

      await imageMetadata.save();

      // Fechar o ExifTool
      await exiftool.end();

      return {
        message: 'Imagem baixada com sucesso!',
        thumbnailDimensions,
      };
    } catch (error) {
      console.log(error);

      throw new HttpException(
        'Falha ao baixar a imagem',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
