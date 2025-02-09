// package: google.maps.routing.v2
// file: routes.proto

var routes_pb = require("./routes_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Routes = (function () {
  function Routes() {}
  Routes.serviceName = "google.maps.routing.v2.Routes";
  return Routes;
}());

Routes.ComputeRoutes = {
  methodName: "ComputeRoutes",
  service: Routes,
  requestStream: false,
  responseStream: false,
  requestType: routes_pb.ComputeRoutesRequest,
  responseType: routes_pb.ComputeRoutesResponse
};

exports.Routes = Routes;

function RoutesClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

RoutesClient.prototype.computeRoutes = function computeRoutes(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Routes.ComputeRoutes, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.RoutesClient = RoutesClient;

