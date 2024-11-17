/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handler, Context, Callback } from 'aws-lambda'
import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { configure as serverlessExpress } from '@vendia/serverless-express' // baixar
import express from 'express'

let cachedServer: Handler

async function bootstrapServer(): Promise<Handler> {
  if (!cachedServer) {
    const expressApp = express()

    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    )

    await nestApp.init()

    cachedServer = serverlessExpress({ app: expressApp })
  }
  return cachedServer
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback<any>,
) => {
  const server = await bootstrapServer()
  return server(event, context, callback)
}
