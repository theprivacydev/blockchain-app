import { createSelector } from "reselect";
import { get } from "lodash";

const account = (state) => get(state, "web3.account");

export const accountSelector = createSelector(account, (a) => a);

const tokenLoaded = state => get(state, 'token.loaded', false);
export const tokenLoadedSelector = createSelector(tokenLoaded, (a) => a);

const exchangeLoaded = state => get(state, 'exchange.loaded', false);
export const exchangeLoadedSelector = createSelector(exchangeLoaded, (a) => a);

export const contractsLoadedSelector = createSelector(tokenLoaded, exchangeLoaded, (tl, el) => tl && el)
