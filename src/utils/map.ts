const BAIDU_MAP_SRC =
  'https://map.qq.com/api/gljs?v=1.exp&key=OKMBZ-E4WCV-EMRPH-UWG2L-RDZJO-DVBM2';
export default function initBMapScript() {
  // eslint-disable-next-line consistent-return
  return new Promise<any>((resolve, reject) => {
    // Map加载后会挂载到window上
    if ((window as any).BMap) {
      // eslint-disable-next-line no-promise-executor-return
      return resolve('BMap has been loaded');
    }
    // 加载成功的回调 src中定义 类似Jsonp
    (window as any).onBMapCallback = () => {
      resolve('baidu map script init success');
    };

    // 插入script标签
    const script = document.createElement('script');
    // script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = `${BAIDU_MAP_SRC}`;
    script.onerror = () => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('baidu map script init failed');
    };
    document.head.appendChild(script);
  });
}
// export default { initBMapScript };
