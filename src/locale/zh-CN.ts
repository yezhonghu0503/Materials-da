import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeLogin from '@/views/login/locale/zh-CN';

import localeWorkplace from '@/views/dashboard/workplace/locale/zh-CN';
/** simple */
// import localeMonitor from '@/views/dashboard/monitor/locale/zh-CN';

import localeSearchTable from '@/views/list/search-table/locale/zh-CN';
import localeClassify from '@/views/list/classify/locale/zh-CN';
import localeCardList from '@/views/list/card/locale/zh-CN';

import localeStepForm from '@/views/form/step/locale/zh-CN';
import localeGroupForm from '@/views/form/group/locale/zh-CN';
import localeRolesForm from '@/views/form/roles/locale/zh-CN';
import localeUserForm from '@/views/form/userManagement/locale/zh-CN';

import localeMeasureForm from '@/views/appointment/measure/locale/zh-CN';
import localeDistributionForm from '@/views/appointment/distribution/locale/zh-CN';
import localeFixForm from '@/views/appointment/fix/locale/zh-CN';

import localeMeasurementForm from '@/views/design/measurement/locale/zh-CN';

import localeDeliveryForm from '@/views/logistics/delivery/locale/zh-CN';

import localeBasicProfile from '@/views/profile/basic/locale/zh-CN';
import localeReplenishmentQueryFrom from '@/views/warehouse/replenishment-query/locale/zh-CN';
// import localeDataAnalysis from '@/views/visualization/data-analysis/locale/zh-CN';
import localeMultiDAnalysis from '@/views/dashboard/multi-dimension-data-analysis/locale/zh-CN';
import localemenuAnomalousReminderFrom from '@/views/result/anomalous-reminder/locale/zh-CN';
import localeComplexQueryFrom from '@/views/result/complex-query/locale/zh-CN';
import localeOrderCheckoutFrom from '@/views/result/order-checkout/locale/zh-CN';

import localeSurveyoOrderFrom from '@/views/design/surveyo-order/locale/zh-CN';
// warehouse
import localeInventoryQueryFrom from '@/views/warehouse/inventory-query/locale/zh-CN';

import localeCreateOrderForm from '@/views/result/create-order/locale/zh-CN';

import localeScreenMode from '@/views/dashboard/screen-mode/locale/zh-CN';

import localeSuccess from '@/views/result/success/locale/zh-CN';
import localeError from '@/views/result/error/locale/zh-CN';

import locale403 from '@/views/exception/403/locale/zh-CN';
import locale404 from '@/views/exception/404/locale/zh-CN';
import locale500 from '@/views/exception/500/locale/zh-CN';

import localeUserInfo from '@/views/user/info/locale/zh-CN';
import localeUserSetting from '@/views/user/setting/locale/zh-CN';
/** simple end */
import localeSettings from './zh-CN/settings';

export default {
  'menu.dashboard': '5G智慧屏',
  'menu.list': '商品管理',
  'menu.result': '订单管理',
  'menu.warehouse': '仓库管理',
  'menu.exception': '活动管理',
  'menu.form': '系统用户',
  'menu.profile': '轮播图管理',
  'menu.appointment': '预约管理',
  'menu.design': '测量设计',
  'menu.logistics': '配送管理',
  'menu.delivery': '交付管理',
  'menu.visualization': '数据可视化',
  'menu.user': '个人中心',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,
  /** simple */
  // ...localeMonitor,
  ...localeSearchTable,
  ...localeClassify,
  ...localeCardList,
  ...localeStepForm,
  ...localeGroupForm,
  ...localeRolesForm,
  ...localeUserForm,
  ...localeBasicProfile,
  // ...localeDataAnalysis,
  ...localeMultiDAnalysis,
  ...localeSuccess,
  ...localeError,
  ...locale403,
  ...locale404,
  ...locale500,
  ...localeUserInfo,
  ...localeUserSetting,

  ...localeMeasureForm,
  ...localeDistributionForm,
  ...localeFixForm,
  ...localeMeasurementForm,
  ...localeDeliveryForm,
  ...localeScreenMode,

  ...localeCreateOrderForm,
  ...localemenuAnomalousReminderFrom,
  ...localeComplexQueryFrom,
  ...localeOrderCheckoutFrom,
  ...localeInventoryQueryFrom,
  ...localeReplenishmentQueryFrom,
  ...localeSurveyoOrderFrom,
  /** simple end */
};
