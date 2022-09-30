import {ethers } from "ethers";
export * from '@/common/utils/date'
export const getBigNumber = (amount, decimals = 18) => {
  return ethers.utils.parseUnits(amount.toString(), decimals);
};
export function preFormatNumber(val) {
  if(!val) {
    return '-'
  }
  return parseInt(val, 10).toFixed(2)
}
