export * from './BreweryApiActions';
export * from './BeerApiActions';
export * from './KegApiActions';

export function shouldFetchArrayType(arrayFromState) {
  return !!(!arrayFromState || arrayFromState.length === 0);
}

export const apiHost = "keg-pi.local";