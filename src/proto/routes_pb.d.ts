// package: google.maps.routing.v2
// file: routes.proto

import * as jspb from "google-protobuf";

export class ComputeRoutesRequest extends jspb.Message {
  hasOrigin(): boolean;
  clearOrigin(): void;
  getOrigin(): RouteLocation | undefined;
  setOrigin(value?: RouteLocation): void;

  hasDestination(): boolean;
  clearDestination(): void;
  getDestination(): RouteLocation | undefined;
  setDestination(value?: RouteLocation): void;

  getTravelMode(): TravelModeMap[keyof TravelModeMap];
  setTravelMode(value: TravelModeMap[keyof TravelModeMap]): void;

  getRoutingPreference(): RoutingPreferenceMap[keyof RoutingPreferenceMap];
  setRoutingPreference(value: RoutingPreferenceMap[keyof RoutingPreferenceMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ComputeRoutesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ComputeRoutesRequest): ComputeRoutesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ComputeRoutesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ComputeRoutesRequest;
  static deserializeBinaryFromReader(message: ComputeRoutesRequest, reader: jspb.BinaryReader): ComputeRoutesRequest;
}

export namespace ComputeRoutesRequest {
  export type AsObject = {
    origin?: RouteLocation.AsObject,
    destination?: RouteLocation.AsObject,
    travelMode: TravelModeMap[keyof TravelModeMap],
    routingPreference: RoutingPreferenceMap[keyof RoutingPreferenceMap],
  }
}

export class RouteLocation extends jspb.Message {
  hasLatLng(): boolean;
  clearLatLng(): void;
  getLatLng(): LatLng | undefined;
  setLatLng(value?: LatLng): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RouteLocation.AsObject;
  static toObject(includeInstance: boolean, msg: RouteLocation): RouteLocation.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RouteLocation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RouteLocation;
  static deserializeBinaryFromReader(message: RouteLocation, reader: jspb.BinaryReader): RouteLocation;
}

export namespace RouteLocation {
  export type AsObject = {
    latLng?: LatLng.AsObject,
  }
}

export class LatLng extends jspb.Message {
  getLatitude(): number;
  setLatitude(value: number): void;

  getLongitude(): number;
  setLongitude(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LatLng.AsObject;
  static toObject(includeInstance: boolean, msg: LatLng): LatLng.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LatLng, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LatLng;
  static deserializeBinaryFromReader(message: LatLng, reader: jspb.BinaryReader): LatLng;
}

export namespace LatLng {
  export type AsObject = {
    latitude: number,
    longitude: number,
  }
}

export class ComputeRoutesResponse extends jspb.Message {
  clearRoutesList(): void;
  getRoutesList(): Array<Route>;
  setRoutesList(value: Array<Route>): void;
  addRoutes(value?: Route, index?: number): Route;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ComputeRoutesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ComputeRoutesResponse): ComputeRoutesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ComputeRoutesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ComputeRoutesResponse;
  static deserializeBinaryFromReader(message: ComputeRoutesResponse, reader: jspb.BinaryReader): ComputeRoutesResponse;
}

export namespace ComputeRoutesResponse {
  export type AsObject = {
    routesList: Array<Route.AsObject>,
  }
}

export class Route extends jspb.Message {
  hasPolyline(): boolean;
  clearPolyline(): void;
  getPolyline(): Polyline | undefined;
  setPolyline(value?: Polyline): void;

  getDistanceMeters(): number;
  setDistanceMeters(value: number): void;

  hasDuration(): boolean;
  clearDuration(): void;
  getDuration(): Duration | undefined;
  setDuration(value?: Duration): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Route.AsObject;
  static toObject(includeInstance: boolean, msg: Route): Route.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Route, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Route;
  static deserializeBinaryFromReader(message: Route, reader: jspb.BinaryReader): Route;
}

export namespace Route {
  export type AsObject = {
    polyline?: Polyline.AsObject,
    distanceMeters: number,
    duration?: Duration.AsObject,
  }
}

export class Polyline extends jspb.Message {
  getEncodedPolyline(): string;
  setEncodedPolyline(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Polyline.AsObject;
  static toObject(includeInstance: boolean, msg: Polyline): Polyline.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Polyline, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Polyline;
  static deserializeBinaryFromReader(message: Polyline, reader: jspb.BinaryReader): Polyline;
}

export namespace Polyline {
  export type AsObject = {
    encodedPolyline: string,
  }
}

export class Duration extends jspb.Message {
  getSeconds(): number;
  setSeconds(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Duration.AsObject;
  static toObject(includeInstance: boolean, msg: Duration): Duration.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Duration, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Duration;
  static deserializeBinaryFromReader(message: Duration, reader: jspb.BinaryReader): Duration;
}

export namespace Duration {
  export type AsObject = {
    seconds: number,
  }
}

export interface TravelModeMap {
  TRAVEL_MODE_UNSPECIFIED: 0;
  DRIVE: 1;
  WALK: 2;
  BICYCLE: 3;
}

export const TravelMode: TravelModeMap;

export interface RoutingPreferenceMap {
  ROUTING_PREFERENCE_UNSPECIFIED: 0;
  TRAFFIC_AWARE: 1;
  TRAFFIC_AWARE_OPTIMAL: 2;
}

export const RoutingPreference: RoutingPreferenceMap;

