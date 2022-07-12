import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

export const CarSchema = VehicleSchema.extend({
  doorsQty: z.number().gte(2).lte(4),
  seatsQty: z.number().gte(2).lte(7),
  _id: z.string().optional(),
});

export type Car = z.infer<typeof CarSchema>;