import {model, Schema} from 'mongoose';
import {Species} from '../../types/Species';

const speciesSchema = new Schema<Species>({
  species_name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      index: '2dsphere',
    },
  },
});

speciesSchema.statics.findByArea = function (
  polygon: number,
): Promise<Species[]> {
  return this.find({
    location: {
      $geoWithin: {
        $geometry: polygon,
      },
    },
  }).exec();
};

export default model<Species & Document>('Species', speciesSchema);
