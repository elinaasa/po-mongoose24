import {model, Schema, Document, Model} from 'mongoose';
import {Species} from '../../types/Species';
import {Polygon} from 'geojson'; // Import the GeoJSON Polygon type

// Define the Species interface extending Document
interface SpeciesDocument extends Species, Document {}

// Define the SpeciesModel interface that includes the static method
interface SpeciesModel extends Model<SpeciesDocument> {
  findByArea(polygon: Polygon): Promise<SpeciesDocument[]>;
}

// Define the schema
const speciesSchema = new Schema<SpeciesDocument>({
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

// Implement the findByArea static method
speciesSchema.statics.findByArea = function (
  polygon: Polygon,
): Promise<SpeciesDocument[]> {
  return this.find({
    location: {
      $geoWithin: {
        $geometry: polygon,
      },
    },
  }).exec();
};

// Export the model with the correct typing
export default model<SpeciesDocument, SpeciesModel>('Species', speciesSchema);
