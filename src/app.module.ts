import { Module } from '@nestjs/common';
import { ImagesController } from './images/images.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ImageMetadata,
  ImageMetadataSchema,
} from './images/schemas/image-metadata.schema';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017'),
    MongooseModule.forFeature([
      { name: ImageMetadata.name, schema: ImageMetadataSchema },
    ]),
  ],
  controllers: [ImagesController],
  providers: [],
})
export class AppModule {}
