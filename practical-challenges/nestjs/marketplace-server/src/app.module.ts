import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service'
import { CreateSellerController } from './controllers/create-seller.controller'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateProductController } from './controllers/create-product.controller'
import { FetchProductsController } from './controllers/fetch-products.controller'
import { CreateCategoryController } from './controllers/create-category.controller'
import { GetSellerController } from './controllers/get-seller.controller'
import { UpdateSellerController } from './controllers/update-seller.controller'
import { SignOutController } from './controllers/sign-out.controller'
import { FetchProductsFromSellerController } from './controllers/fetch-products-from-seller.controller'
import { GetProductByIDController } from './controllers/get-product-by-id.controller'
import { UpdateProductController } from './controllers/edit-product.controller'
import { UpdateProductStatusController } from './controllers/update-product-status.controller'
import { FetchCategoriesController } from './controllers/fetch-categories.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateSellerController,
    AuthenticateController,
    GetSellerController,
    UpdateSellerController,
    CreateProductController,
    FetchProductsController,
    FetchProductsFromSellerController,
    GetProductByIDController,
    UpdateProductController,
    UpdateProductStatusController,
    CreateCategoryController,
    FetchCategoriesController,
    SignOutController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
