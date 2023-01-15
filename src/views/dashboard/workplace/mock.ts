import Mock from 'mockjs';
import qs from 'query-string';
import dayjs from 'dayjs';
import { GetParams } from '@/types/global';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';

const textList = [
  {
    key: 1,
    clickNumber: '346.3w+',
    title: '管道PVC-U饮水用管材…',
    increases: 35,
  },
  {
    key: 2,
    clickNumber: '324.2w+',
    title: '厨房水槽洗菜盆排水管…',
    increases: 22,
  },
  {
    key: 3,
    clickNumber: '318.9w+',
    title: 'LESSO/联塑PVC红蓝线…',
    increases: 9,
  },
  {
    key: 4,
    clickNumber: '257.9w+',
    title: '力特电线国标4平方2.5…',
    increases: 17,
  },
  {
    key: 5,
    clickNumber: '124.2w+',
    title: '网线家用超六6类千兆…',
    increases: 37,
  },
];
const imageList = [
  {
    key: 1,
    clickNumber: '346.3w+',
    title: '管道PVC-U饮水用管材…',
    increases: 35,
  },
  {
    key: 2,
    clickNumber: '324.2w+',
    title: '厨房水槽洗菜盆排水管…',
    increases: 22,
  },
  {
    key: 3,
    clickNumber: '318.9w+',
    title: 'LESSO/联塑PVC红蓝线…',
    increases: 9,
  },
  {
    key: 4,
    clickNumber: '257.9w+',
    title: '力特电线国标4平方2.5…',
    increases: 17,
  },
  {
    key: 5,
    clickNumber: '124.2w+',
    title: '网线家用超六6类千兆…',
    increases: 37,
  },
];
const videoList = [
  {
    key: 1,
    clickNumber: '346.3w+',
    title: '管道PVC-U饮水用管材…',
    increases: 35,
  },
  {
    key: 2,
    clickNumber: '324.2w+',
    title: '厨房水槽洗菜盆排水管…',
    increases: 22,
  },
  {
    key: 3,
    clickNumber: '318.9w+',
    title: 'LESSO/联塑PVC红蓝线…',
    increases: 9,
  },
  {
    key: 4,
    clickNumber: '257.9w+',
    title: '力特电线国标4平方2.5…',
    increases: 17,
  },
  {
    key: 5,
    clickNumber: '124.2w+',
    title: '网线家用超六6类千兆…',
    increases: 37,
  },
];
setupMock({
  setup() {
    Mock.mock(new RegExp('/api/content-data'), () => {
      const presetData = [58, 81, 53, 90, 64, 88, 49, 79];
      const getLineData = () => {
        const count = 8;
        return new Array(count).fill(0).map((el, idx) => ({
          x: dayjs()
            .day(idx - 2)
            .format('YYYY-MM-DD'),
          y: presetData[idx],
        }));
      };
      return successResponseWrap([...getLineData()]);
    });
    Mock.mock(new RegExp('/api/popular/list'), (params: GetParams) => {
      const { type = 'text' } = qs.parseUrl(params.url).query;
      if (type === 'image') {
        return successResponseWrap([...videoList]);
      }
      if (type === 'video') {
        return successResponseWrap([...imageList]);
      }
      return successResponseWrap([...textList]);
    });
  },
});
