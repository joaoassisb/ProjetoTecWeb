"use strict";

import "./logout.directive";
import "./login";

const m = angular.module("app");

m.config($httpProvider => {
  $httpProvider.interceptors.push(($q, $location) => ({
    responseError(response) {
      if (response.status === 401) {
        $location.path("login");
      }

      return $q.reject(response);
    }
  }));
});

m.service("Auth", AuthService);

function AuthService($http) {
  const observers = [];

  const notify = value => {
    observers.forEach(observer => {
      observer(value);
    });
  };

  this.login = credenciais =>
    $http.post("/api/session", credenciais).then(
      ({ data }) => {
        notify(true);

        return data;
      },
      err => {
        notify(false);
        throw err;
      }
    );

  this.logout = () =>
    $http.delete("/api/session").then(({ data }) => {
      notify(false);

      return data;
    });

  this.getSession = () =>
    $http.get("/api/session").then(
      ({ data }) => {
        notify(true);

        return data;
      },
      err => {
        notify(false);
        throw err;
      }
    );

  this.subscribe = observer => {
    observers.push(observer);

    return () => {
      const index = observers.find(observer);

      observers.splice(index, 1);
    };
  };
}
