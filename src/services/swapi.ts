import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  NoUndefinedField,
  ResourceMultiple,
  ResourceName,
  ResourceOne,
  ResourceUrl,
  SearchParams,
} from '!/types';

// Based on: https://github.com/cfjedimaster/SWAPI-Wrapper
const rootURL = 'https://swapi.dev/api/';

// How long to cache the result for, in miliseconds. default: 1 week
const CACHE_TIME_MS = 6.048e8;

async function request(url: string) {
  try {
    const data = await AsyncStorage.getItem(url);
    if (!data) {
      return await Promise.reject('No data found in async storage');
    }

    const object = JSON.parse(data);

    if (Date.now() - object.fetchedAt > CACHE_TIME_MS) {
      return await Promise.reject('Data found is too old');
    }

    return object;
  } catch (err) {
    console.log(err);
    const response = await fetch(url);
    if (!response.ok) {
      return Promise.reject('Unable to load data');
    }

    const data = await response.json();
    data.fetchedAt = Date.now();

    void AsyncStorage.setItem(url, JSON.stringify(data));

    return data;
  }
}

function singularRequestGenerator<R extends ResourceName>(path: R) {
  return async function (id: number): Promise<ResourceOne[R]> {
    return request(rootURL + path + '/' + id.toString() + '/');
  };
}

function pluralRequestGenerator<R extends ResourceName>(path: R) {
  return async function (searchParams?: SearchParams): Promise<ResourceMultiple<R>> {
    if (searchParams) {
      const queryObject = new URLSearchParams(searchParams as NoUndefinedField<SearchParams>).toString();
      return request(rootURL + path + '/?' + queryObject);
    }

    return request(rootURL + path + '/');
  };
}

export async function getResources(): Promise<Record<ResourceName, ResourceUrl>> {
  return request(rootURL);
}

export const getPerson = singularRequestGenerator('people');
export const getPeople = pluralRequestGenerator('people');
export const getFilm = singularRequestGenerator('films');
export const getFilms = pluralRequestGenerator('films');
export const getPlanet = singularRequestGenerator('planets');
export const getPlanets = pluralRequestGenerator('planets');
export const getSpecies = singularRequestGenerator('species');
export const getAllSpecies = pluralRequestGenerator('species');
export const getStarship = singularRequestGenerator('starships');
export const getStarships = pluralRequestGenerator('starships');
export const getVehicle = singularRequestGenerator('vehicles');
export const getVehicles = pluralRequestGenerator('vehicles');

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const chooseRequest = (resource: ResourceName) => {
  let getRequest;
  switch (resource) {
    case 'films':
      getRequest = getFilms;
      break;
    case 'species':
      getRequest = getAllSpecies;
      break;
    case 'starships':
      getRequest = getStarships;
      break;
    case 'vehicles':
      getRequest = getVehicles;
      break;
    case 'people':
      getRequest = getPeople;
      break;
    case 'planets':
    default:
      getRequest = getPlanets;
      break;
  }

  return getRequest;
};
