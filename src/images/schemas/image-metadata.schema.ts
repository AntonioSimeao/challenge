import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageMetadataDocument = ImageMetadata & Document;

@Schema()
export class ImageMetadata {
  @Prop()
  filename: string;

  @Prop()
  fileSize: number;

  @Prop()
  mimeType: string;

  @Prop()
  width: number;

  @Prop()
  height: number;

  @Prop()
  createdDate: Date;

  @Prop()
  modifiedDate: Date;
}

export const ImageMetadataSchema = SchemaFactory.createForClass(ImageMetadata);
