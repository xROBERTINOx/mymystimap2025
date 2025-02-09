// package: google.maps.routing.v2
// file: routes.proto

import * as routes_pb from "./routes_pb";
import {grpc} from "@improbable-eng/grpc-web";

type RoutesComputeRoutes = {
  readonly methodName: string;
  readonly service: typeof Routes;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof routes_pb.ComputeRoutesRequest;
  readonly responseType: typeof routes_pb.ComputeRoutesResponse;
};

export class Routes {
  static readonly serviceName: string;
  static readonly ComputeRoutes: RoutesComputeRoutes;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class RoutesClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  computeRoutes(
    requestMessage: routes_pb.ComputeRoutesRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: routes_pb.ComputeRoutesResponse|null) => void
  ): UnaryResponse;
  computeRoutes(
    requestMessage: routes_pb.ComputeRoutesRequest,
    callback: (error: ServiceError|null, responseMessage: routes_pb.ComputeRoutesResponse|null) => void
  ): UnaryResponse;
}

