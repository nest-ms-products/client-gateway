import 'dotenv/config';
import * as joi from 'joi';
interface EnVars {
  PORT: number;
  MS_PRODUCTS_PORT: number;
  MS_PRODUCTS_HOST: string;
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    MS_PRODUCTS_PORT: joi.number().required(),
    MS_PRODUCTS_HOST: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const enVars: EnVars = value;

export const envs = {
  port: enVars.PORT,
  msProductsPort: enVars.MS_PRODUCTS_PORT,
  msProductsHost: enVars.MS_PRODUCTS_HOST,
};
