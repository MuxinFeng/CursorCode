import { getAthenaDomain } from "@h/h-toolbox/esm/domain";
import { root, isDevelopment, domain } from "@h/h-toolbox/esm/runtime";

enum ProdDomains {
  Legacy = "kezaihui.com",
  Latest = "zaihui.com.cn",
  ZaihuiYun = "zaihuiyun.com",
}

let protocol = "https";
let cookieDomain = "127.0.0.1";
const isTestEnvironment = domain !== ProdDomains.Legacy; // 是否是测试环境， 'kezaihui.com' 为线上环境

if (root) {
  if (isDevelopment) {
    cookieDomain = root.location.hostname;
  } else {
    cookieDomain = `.${domain}`;
  }
  // eslint-disable-next-line prefer-destructuring
  protocol = root.location.protocol;
}

// 这个走是 global 的 不需要转发，可以直接调用
const messiahUrl = `${protocol}//messiah.${
  isTestEnvironment ? domain : ProdDomains.Latest
}/api/v1/global`;

const athenaUrl = `${protocol}//${getAthenaDomain(domain)}`;
const zaUrl = `${protocol}//${getAthenaDomain(domain, "za")}`;

const genAthenaMicroService = (service, gateway = athenaUrl) =>
  `${gateway}/${service}`;

const bossUrl = genAthenaMicroService("boss");
const panguUrl = genAthenaMicroService("pangu");
const messiahUrlWithoutGlobal = `${genAthenaMicroService("messiah")}/api/v1`;
const bowlUrl = genAthenaMicroService("bowl");

export default {
  domain,
  cookieDomain,
  messiahUrl,
  messiahUrlWithoutGlobal,
  athenaUrl,
  bossUrl,
  panguUrl,
  zaUrl,
  bowlUrl,
};
