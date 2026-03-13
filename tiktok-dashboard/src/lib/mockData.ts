// ============ 广告主数据 ============
export type AdvertiserStatus = "active" | "paused" | "inactive";

export interface Advertiser {
  id: string;
  name: string;           // 客户名称/简称
  companyName: string;    // 客户公司全称
  contractDate: string;   // 合同签约时间
  email: string;          // 邮箱
  phone: string;          // 电话
  salesId: string;        // 归属销售ID
  bcIds: string[];        // 绑定的BC ID列表
  balance: number;
  totalBudget: number;
  status: AdvertiserStatus;
  todaySpend: number;
  impressions: number;
  ctr: number;
  campaigns: number;
  createdAt: string;
}

export const advertisers: Advertiser[] = [
  { id: "ADV001", name: "潮流服饰旗舰店", companyName: "杭州潮流服饰有限公司", contractDate: "2025-06-01", email: "contact@chaoliu.com", phone: "0571-88881001", salesId: "USR004", bcIds: ["BC001", "BC002"], balance: 45200, totalBudget: 80000, status: "active", todaySpend: 3820, impressions: 284000, ctr: 3.2, campaigns: 8, createdAt: "2025-06-01" },
  { id: "ADV002", name: "美妆护肤优选", companyName: "上海美妆科技有限公司", contractDate: "2025-06-15", email: "biz@meizhuang.com", phone: "021-66661002", salesId: "USR004", bcIds: ["BC003"], balance: 12800, totalBudget: 30000, status: "active", todaySpend: 1560, impressions: 132000, ctr: 2.8, campaigns: 5, createdAt: "2025-06-15" },
  { id: "ADV003", name: "数码电子专营", companyName: "深圳数码科技有限公司", contractDate: "2025-07-01", email: "sales@shuma.com", phone: "0755-55551003", salesId: "USR009", bcIds: ["BC004", "BC005", "BC006"], balance: 67500, totalBudget: 100000, status: "active", todaySpend: 5240, impressions: 421000, ctr: 4.1, campaigns: 12, createdAt: "2025-07-01" },
  { id: "ADV004", name: "母婴生活馆", companyName: "北京母婴用品有限公司", contractDate: "2025-10-01", email: "info@muying.com", phone: "010-88881004", salesId: "USR009", bcIds: ["BC007"], balance: 3200, totalBudget: 20000, status: "paused", todaySpend: 0, impressions: 0, ctr: 0, campaigns: 3, createdAt: "2025-10-01" },
  { id: "ADV005", name: "健康食品专区", companyName: "广州健康食品有限公司", contractDate: "2025-08-01", email: "contact@jiankang.com", phone: "020-77771005", salesId: "USR004", bcIds: ["BC008"], balance: 28900, totalBudget: 50000, status: "active", todaySpend: 2150, impressions: 178000, ctr: 3.7, campaigns: 6, createdAt: "2025-08-01" },
  { id: "ADV006", name: "家居装饰商城", companyName: "成都家居装饰有限公司", contractDate: "2025-11-01", email: "service@jiaju.com", phone: "028-66661006", salesId: "USR009", bcIds: ["BC009"], balance: 850, totalBudget: 15000, status: "inactive", todaySpend: 0, impressions: 0, ctr: 0, campaigns: 2, createdAt: "2025-11-01" },
  { id: "ADV007", name: "运动户外品牌", companyName: "厦门运动科技有限公司", contractDate: "2025-07-15", email: "brand@yundong.com", phone: "0592-55551007", salesId: "USR004", bcIds: ["BC010", "BC011"], balance: 52100, totalBudget: 70000, status: "active", todaySpend: 4380, impressions: 356000, ctr: 3.9, campaigns: 9, createdAt: "2025-07-15" },
  { id: "ADV008", name: "宠物用品专卖", companyName: "南京宠物用品有限公司", contractDate: "2025-09-01", email: "pet@chongwu.com", phone: "025-88881008", salesId: "USR009", bcIds: ["BC012"], balance: 19400, totalBudget: 25000, status: "active", todaySpend: 1820, impressions: 145000, ctr: 2.5, campaigns: 4, createdAt: "2025-09-01" },
];

// ============ BC 商务中心数据 ============
export type BCStatus = "active" | "inactive";

export interface BusinessCenter {
  id: string;
  name: string;
  advertiserId: string;
  timezone: string;
  status: BCStatus;
  createdAt: string;
}

export const businessCenters: BusinessCenter[] = [
  { id: "BC001", name: "潮流服饰-主账户BC", advertiserId: "ADV001", timezone: "Asia/Shanghai", status: "active", createdAt: "2025-06-01" },
  { id: "BC002", name: "潮流服饰-海外BC", advertiserId: "ADV001", timezone: "America/Los_Angeles", status: "active", createdAt: "2025-08-01" },
  { id: "BC003", name: "美妆护肤BC", advertiserId: "ADV002", timezone: "Asia/Shanghai", status: "active", createdAt: "2025-06-15" },
  { id: "BC004", name: "数码电子-国内BC", advertiserId: "ADV003", timezone: "Asia/Shanghai", status: "active", createdAt: "2025-07-01" },
  { id: "BC005", name: "数码电子-东南亚BC", advertiserId: "ADV003", timezone: "Asia/Singapore", status: "active", createdAt: "2025-09-01" },
  { id: "BC006", name: "数码电子-欧洲BC", advertiserId: "ADV003", timezone: "Europe/London", status: "active", createdAt: "2025-10-01" },
  { id: "BC007", name: "母婴生活馆BC", advertiserId: "ADV004", timezone: "Asia/Shanghai", status: "inactive", createdAt: "2025-10-01" },
  { id: "BC008", name: "健康食品BC", advertiserId: "ADV005", timezone: "Asia/Shanghai", status: "active", createdAt: "2025-08-01" },
  { id: "BC009", name: "家居装饰BC", advertiserId: "ADV006", timezone: "Asia/Shanghai", status: "inactive", createdAt: "2025-11-01" },
  { id: "BC010", name: "运动户外-国内BC", advertiserId: "ADV007", timezone: "Asia/Shanghai", status: "active", createdAt: "2025-07-15" },
  { id: "BC011", name: "运动户外-北美BC", advertiserId: "ADV007", timezone: "America/New_York", status: "active", createdAt: "2025-11-01" },
  { id: "BC012", name: "宠物用品BC", advertiserId: "ADV008", timezone: "Asia/Shanghai", status: "active", createdAt: "2025-09-01" },
];

// ============ 广告账户数据 ============
export type AdAccountStatus = "active" | "paused" | "disabled" | "reviewing";

export interface AdAccount {
  id: string;
  name: string;
  bcId: string;
  advertiserId: string;
  balance: number;
  dailyBudget: number;
  status: AdAccountStatus;
  currency: string;
  createdAt: string;
}

export const adAccounts: AdAccount[] = [
  // ADV001 - 潮流服饰 (2个BC, 4个广告账户)
  { id: "AA001", name: "潮流服饰-春季推广", bcId: "BC001", advertiserId: "ADV001", balance: 25000, dailyBudget: 5000, status: "active", currency: "CNY", createdAt: "2025-06-05" },
  { id: "AA002", name: "潮流服饰-品牌宣传", bcId: "BC001", advertiserId: "ADV001", balance: 15000, dailyBudget: 3000, status: "active", currency: "CNY", createdAt: "2025-07-01" },
  { id: "AA003", name: "潮流服饰-海外投放", bcId: "BC002", advertiserId: "ADV001", balance: 5200, dailyBudget: 1000, status: "active", currency: "USD", createdAt: "2025-08-05" },
  // ADV002 - 美妆护肤 (1个BC, 2个广告账户)
  { id: "AA004", name: "美妆-防晒系列", bcId: "BC003", advertiserId: "ADV002", balance: 8000, dailyBudget: 2000, status: "active", currency: "CNY", createdAt: "2025-06-20" },
  { id: "AA005", name: "美妆-护肤系列", bcId: "BC003", advertiserId: "ADV002", balance: 4800, dailyBudget: 1500, status: "paused", currency: "CNY", createdAt: "2025-08-01" },
  // ADV003 - 数码电子 (3个BC, 6个广告账户)
  { id: "AA006", name: "数码-手机配件", bcId: "BC004", advertiserId: "ADV003", balance: 30000, dailyBudget: 8000, status: "active", currency: "CNY", createdAt: "2025-07-05" },
  { id: "AA007", name: "数码-电脑周边", bcId: "BC004", advertiserId: "ADV003", balance: 20000, dailyBudget: 5000, status: "active", currency: "CNY", createdAt: "2025-08-01" },
  { id: "AA008", name: "数码-东南亚推广", bcId: "BC005", advertiserId: "ADV003", balance: 10000, dailyBudget: 2000, status: "active", currency: "USD", createdAt: "2025-09-10" },
  { id: "AA009", name: "数码-欧洲市场", bcId: "BC006", advertiserId: "ADV003", balance: 7500, dailyBudget: 1500, status: "reviewing", currency: "EUR", createdAt: "2025-10-15" },
  // ADV004 - 母婴生活馆 (1个BC, 1个广告账户)
  { id: "AA010", name: "母婴-玩具推广", bcId: "BC007", advertiserId: "ADV004", balance: 3200, dailyBudget: 1000, status: "paused", currency: "CNY", createdAt: "2025-10-05" },
  // ADV005 - 健康食品 (1个BC, 2个广告账户)
  { id: "AA011", name: "健康-蛋白粉系列", bcId: "BC008", advertiserId: "ADV005", balance: 18000, dailyBudget: 3000, status: "active", currency: "CNY", createdAt: "2025-08-10" },
  { id: "AA012", name: "健康-维生素系列", bcId: "BC008", advertiserId: "ADV005", balance: 10900, dailyBudget: 2000, status: "active", currency: "CNY", createdAt: "2025-09-01" },
  // ADV006 - 家居装饰 (1个BC, 1个广告账户)
  { id: "AA013", name: "家居-北欧风格", bcId: "BC009", advertiserId: "ADV006", balance: 850, dailyBudget: 500, status: "disabled", currency: "CNY", createdAt: "2025-11-10" },
  // ADV007 - 运动户外 (2个BC, 3个广告账户)
  { id: "AA014", name: "运动-马拉松装备", bcId: "BC010", advertiserId: "ADV007", balance: 35000, dailyBudget: 6000, status: "active", currency: "CNY", createdAt: "2025-07-20" },
  { id: "AA015", name: "运动-健身器材", bcId: "BC010", advertiserId: "ADV007", balance: 12000, dailyBudget: 3000, status: "active", currency: "CNY", createdAt: "2025-09-01" },
  { id: "AA016", name: "运动-北美市场", bcId: "BC011", advertiserId: "ADV007", balance: 5100, dailyBudget: 1000, status: "active", currency: "USD", createdAt: "2025-11-15" },
  // ADV008 - 宠物用品 (1个BC, 2个广告账户)
  { id: "AA017", name: "宠物-猫粮推广", bcId: "BC012", advertiserId: "ADV008", balance: 12000, dailyBudget: 2000, status: "active", currency: "CNY", createdAt: "2025-09-10" },
  { id: "AA018", name: "宠物-狗粮推广", bcId: "BC012", advertiserId: "ADV008", balance: 7400, dailyBudget: 1500, status: "active", currency: "CNY", createdAt: "2025-10-01" },
];

export const campaigns = [
  { id: "CAM001", advertiser: "潮流服饰旗舰店", advId: "ADV001", name: "春季新品推广-短袖系列", status: "active", budget: 5000, spend: 3820, impressions: 284000, clicks: 9088, ctr: 3.2, startDate: "2026-03-01", endDate: "2026-03-31" },
  { id: "CAM002", advertiser: "数码电子专营", advId: "ADV003", name: "618预热-手机配件", status: "active", budget: 8000, spend: 5240, impressions: 421000, clicks: 17261, ctr: 4.1, startDate: "2026-03-05", endDate: "2026-04-05" },
  { id: "CAM003", advertiser: "运动户外品牌", advId: "ADV007", name: "马拉松赛季装备推广", status: "active", budget: 6000, spend: 4380, impressions: 356000, clicks: 13884, ctr: 3.9, startDate: "2026-03-10", endDate: "2026-04-10" },
  { id: "CAM004", advertiser: "健康食品专区", advId: "ADV005", name: "蛋白粉系列-健身人群", status: "active", budget: 3000, spend: 2150, impressions: 178000, clicks: 6586, ctr: 3.7, startDate: "2026-03-08", endDate: "2026-03-28" },
  { id: "CAM005", advertiser: "美妆护肤优选", advId: "ADV002", name: "防晒季-SPF50+系列", status: "active", budget: 2500, spend: 1560, impressions: 132000, clicks: 3696, ctr: 2.8, startDate: "2026-03-12", endDate: "2026-04-12" },
  { id: "CAM006", advertiser: "宠物用品专卖", advId: "ADV008", name: "猫粮新品尝鲜活动", status: "active", budget: 2000, spend: 1820, impressions: 145000, clicks: 3625, ctr: 2.5, startDate: "2026-03-01", endDate: "2026-03-20" },
  { id: "CAM007", advertiser: "母婴生活馆", advId: "ADV004", name: "早教玩具春季促销", status: "paused", budget: 1500, spend: 890, impressions: 68000, clicks: 1904, ctr: 2.8, startDate: "2026-02-20", endDate: "2026-03-20" },
  { id: "CAM008", advertiser: "家居装饰商城", advId: "ADV006", name: "北欧风客厅改造", status: "inactive", budget: 1000, spend: 320, impressions: 24000, clicks: 480, ctr: 2.0, startDate: "2026-02-01", endDate: "2026-02-28" },
];

export const trendData = [
  { date: "03/07", spend: 15200, impressions: 1180000 },
  { date: "03/08", spend: 17800, impressions: 1340000 },
  { date: "03/09", spend: 16500, impressions: 1260000 },
  { date: "03/10", spend: 19200, impressions: 1520000 },
  { date: "03/11", spend: 21400, impressions: 1680000 },
  { date: "03/12", spend: 18900, impressions: 1450000 },
  { date: "03/13", spend: 18970, impressions: 1516000 },
];

export const billingRecords = [
  { id: "PAY001", advertiser: "数码电子专营", amount: 50000, type: "充值", date: "2026-03-10 14:32", operator: "张经理", balance: 67500, note: "季度预充值" },
  { id: "PAY002", advertiser: "运动户外品牌", amount: 30000, type: "充值", date: "2026-03-09 10:15", operator: "李总", balance: 52100, note: "品牌活动备用金" },
  { id: "PAY003", advertiser: "潮流服饰旗舰店", amount: -3820, type: "消耗", date: "2026-03-13 00:00", operator: "系统", balance: 45200, note: "今日广告消耗" },
  { id: "PAY004", advertiser: "健康食品专区", amount: 20000, type: "充值", date: "2026-03-08 16:45", operator: "王主管", balance: 28900, note: "Q2推广预算" },
  { id: "PAY005", advertiser: "美妆护肤优选", amount: -1560, type: "消耗", date: "2026-03-13 00:00", operator: "系统", balance: 12800, note: "今日广告消耗" },
  { id: "PAY006", advertiser: "宠物用品专卖", amount: 10000, type: "充值", date: "2026-03-07 11:20", operator: "陈经理", balance: 19400, note: "3月推广充值" },
  { id: "PAY007", advertiser: "母婴生活馆", amount: -890, type: "消耗", date: "2026-03-12 00:00", operator: "系统", balance: 3200, note: "昨日消耗结算" },
  { id: "PAY008", advertiser: "家居装饰商城", amount: 5000, type: "充值", date: "2026-03-01 09:30", operator: "赵专员", balance: 850, note: "3月推广预算" },
];

export const creatives = [
  { id: "CRE001", name: "春季新品主图-竖版", type: "视频", size: "1080x1920", advertiser: "潮流服饰旗舰店", status: "approved", views: 284000, ctr: 3.2, uploadDate: "2026-03-01", duration: "15s", thumbnail: "👗" },
  { id: "CRE002", name: "手机配件开箱体验", type: "视频", size: "1080x1920", advertiser: "数码电子专营", status: "approved", views: 421000, ctr: 4.1, uploadDate: "2026-03-05", duration: "30s", thumbnail: "📱" },
  { id: "CRE003", name: "蛋白粉产品介绍横幅", type: "图片", size: "1200x628", advertiser: "健康食品专区", status: "approved", views: 178000, ctr: 3.7, uploadDate: "2026-03-08", duration: "-", thumbnail: "💪" },
  { id: "CRE004", name: "防晒霜涂抹效果展示", type: "视频", size: "1080x1920", advertiser: "美妆护肤优选", status: "reviewing", views: 0, ctr: 0, uploadDate: "2026-03-12", duration: "20s", thumbnail: "☀️" },
  { id: "CRE005", name: "跑鞋专业测评", type: "视频", size: "1080x1920", advertiser: "运动户外品牌", status: "approved", views: 356000, ctr: 3.9, uploadDate: "2026-03-10", duration: "45s", thumbnail: "👟" },
  { id: "CRE006", name: "猫粮喂食场景", type: "图片", size: "1080x1080", advertiser: "宠物用品专卖", status: "approved", views: 145000, ctr: 2.5, uploadDate: "2026-03-01", duration: "-", thumbnail: "🐱" },
  { id: "CRE007", name: "儿童积木玩具测评", type: "视频", size: "1080x1920", advertiser: "母婴生活馆", status: "rejected", views: 0, ctr: 0, uploadDate: "2026-03-11", duration: "25s", thumbnail: "🧸" },
  { id: "CRE008", name: "北欧客厅装修前后对比", type: "图片", size: "1200x628", advertiser: "家居装饰商城", status: "approved", views: 24000, ctr: 2.0, uploadDate: "2026-02-01", duration: "-", thumbnail: "🛋️" },
];

export type UserRole = "admin" | "operator" | "finance" | "sales" | "advertiser";
export type UserStatus = "active" | "inactive";

export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  bindAdvertiserId?: string;
  createdAt: string;
  lastLoginAt: string;
}

export const users: User[] = [
  { id: "USR001", username: "张管理", email: "admin@agency.com", phone: "13800001001", role: "admin", status: "active", createdAt: "2025-01-01", lastLoginAt: "2026-03-13 09:30" },
  { id: "USR002", username: "李运营", email: "operator@agency.com", phone: "13800001002", role: "operator", status: "active", createdAt: "2025-02-15", lastLoginAt: "2026-03-13 08:45" },
  { id: "USR003", username: "王财务", email: "finance@agency.com", phone: "13800001003", role: "finance", status: "active", createdAt: "2025-03-10", lastLoginAt: "2026-03-12 17:20" },
  { id: "USR004", username: "赵销售", email: "sales@agency.com", phone: "13800001004", role: "sales", status: "active", createdAt: "2025-04-20", lastLoginAt: "2026-03-13 10:15" },
  { id: "USR005", username: "潮流服饰店主", email: "adv001@merchant.com", phone: "13900002001", role: "advertiser", status: "active", bindAdvertiserId: "ADV001", createdAt: "2025-06-01", lastLoginAt: "2026-03-13 11:00" },
  { id: "USR006", username: "美妆优选店主", email: "adv002@merchant.com", phone: "13900002002", role: "advertiser", status: "active", bindAdvertiserId: "ADV002", createdAt: "2025-06-15", lastLoginAt: "2026-03-12 14:30" },
  { id: "USR007", username: "数码专营店主", email: "adv003@merchant.com", phone: "13900002003", role: "advertiser", status: "active", bindAdvertiserId: "ADV003", createdAt: "2025-07-01", lastLoginAt: "2026-03-13 09:00" },
  { id: "USR008", username: "陈运营", email: "operator2@agency.com", phone: "13800001005", role: "operator", status: "inactive", createdAt: "2025-08-01", lastLoginAt: "2026-02-28 16:00" },
  { id: "USR009", username: "刘销售", email: "sales2@agency.com", phone: "13800001006", role: "sales", status: "active", createdAt: "2025-09-15", lastLoginAt: "2026-03-11 13:45" },
  { id: "USR010", username: "母婴馆店主", email: "adv004@merchant.com", phone: "13900002004", role: "advertiser", status: "inactive", bindAdvertiserId: "ADV004", createdAt: "2025-10-01", lastLoginAt: "2026-02-15 10:00" },
];

export const roleLabels: Record<UserRole, string> = {
  admin: "管理员",
  operator: "运营",
  finance: "财务",
  sales: "销售",
  advertiser: "广告主",
};

// ============ 开户申请数据 ============
export type InternalReviewStatus = "pending" | "approved" | "rejected";
export type MediaReviewStatus = "reviewing" | "approved" | "rejected";

export type IDType = "身份证" | "护照" | "港澳通行证" | "台湾通行证";
export type EnterpriseType = "个体工商户" | "有限责任公司" | "股份有限公司" | "个人独资企业" | "合伙企业" | "其他";
export type DeliveryMethod = "自助投放" | "代运营投放";
export type Currency = "CNY" | "USD" | "EUR" | "GBP" | "JPY" | "HKD";

export interface AccountApplication {
  id: string;              // 申请编号
  advertiserId: string;    // 广告主ID
  applicantId: string;     // 申请人ID（用户ID）

  // 企业信息
  companyName: string;              // 开户主体（企业名称）
  businessLicensePhoto?: string;    // 营业执照照片URL
  unifiedSocialCreditCode: string;  // 统一社会信用代码
  region: string;                   // 注册地区
  enterpriseType: EnterpriseType;   // 企业类型
  industry: string;                 // 所属行业

  // 法人信息
  legalPerson: string;              // 法定代表人
  idType: IDType;                   // 证件类型
  idNumber: string;                 // 法人证件号码

  // 结算信息
  unionPayAccount: string;          // 银联账号
  contactPhone: string;             // 手机号码
  authorizationDocument?: string;   // 关于对外敏感信息授权书URL

  // 广告账户信息
  accountName: string;              // 广告账户名称
  timezone: string;                 // 广告账户时区
  currency: Currency;               // 广告结算币种
  deliveryMethod: DeliveryMethod;   // 投放方式
  promotionLink: string;            // 推广链接
  bcId: string;                     // BC ID

  // 审核状态
  internalStatus: InternalReviewStatus;  // 内部审核状态
  mediaStatus: MediaReviewStatus;        // 媒体状态

  // 时间信息
  createdAt: string;       // 申请时间
  updatedAt: string;       // 更新时间
  remark?: string;         // 备注
}

export const accountApplications: AccountApplication[] = [
  {
    id: "APP001",
    advertiserId: "ADV001",
    applicantId: "USR005",
    companyName: "杭州潮流服饰有限公司",
    businessLicensePhoto: "/uploads/license001.jpg",
    unifiedSocialCreditCode: "91330100MA2KXXXX1X",
    region: "浙江省杭州市",
    enterpriseType: "有限责任公司",
    industry: "服装零售",
    legalPerson: "张三",
    idType: "身份证",
    idNumber: "330102199001011234",
    unionPayAccount: "6222021234567890123",
    contactPhone: "13800138001",
    authorizationDocument: "/uploads/auth001.pdf",
    accountName: "潮流服饰-夏季推广",
    timezone: "Asia/Shanghai",
    currency: "CNY",
    deliveryMethod: "自助投放",
    promotionLink: "https://chaoliu.com",
    bcId: "BC001",
    internalStatus: "approved",
    mediaStatus: "approved",
    createdAt: "2026-03-01 10:30",
    updatedAt: "2026-03-02 14:00",
    remark: "夏季新品推广账户"
  },
  {
    id: "APP002",
    advertiserId: "ADV001",
    applicantId: "USR005",
    companyName: "杭州潮流服饰有限公司",
    businessLicensePhoto: "/uploads/license001.jpg",
    unifiedSocialCreditCode: "91330100MA2KXXXX1X",
    region: "浙江省杭州市",
    enterpriseType: "有限责任公司",
    industry: "服装零售",
    legalPerson: "张三",
    idType: "身份证",
    idNumber: "330102199001011234",
    unionPayAccount: "6222021234567890123",
    contactPhone: "13800138001",
    authorizationDocument: "/uploads/auth001.pdf",
    accountName: "潮流服饰-品牌形象",
    timezone: "America/Los_Angeles",
    currency: "USD",
    deliveryMethod: "代运营投放",
    promotionLink: "https://chaoliu-global.com",
    bcId: "BC002",
    internalStatus: "approved",
    mediaStatus: "reviewing",
    createdAt: "2026-03-05 09:15",
    updatedAt: "2026-03-06 11:00",
    remark: "海外品牌推广"
  },
  {
    id: "APP003",
    advertiserId: "ADV002",
    applicantId: "USR006",
    companyName: "上海美妆科技有限公司",
    businessLicensePhoto: "/uploads/license002.jpg",
    unifiedSocialCreditCode: "91310100MA1KXXXX2X",
    region: "上海市浦东新区",
    enterpriseType: "有限责任公司",
    industry: "化妆品零售",
    legalPerson: "李四",
    idType: "身份证",
    idNumber: "310101199205152345",
    unionPayAccount: "6222021234567890456",
    contactPhone: "13900139002",
    authorizationDocument: "/uploads/auth002.pdf",
    accountName: "美妆-618大促",
    timezone: "Asia/Shanghai",
    currency: "CNY",
    deliveryMethod: "自助投放",
    promotionLink: "https://meizhuang.com/618",
    bcId: "BC003",
    internalStatus: "pending",
    mediaStatus: "reviewing",
    createdAt: "2026-03-10 14:20",
    updatedAt: "2026-03-10 14:20",
    remark: "618活动专用账户"
  },
  {
    id: "APP004",
    advertiserId: "ADV003",
    applicantId: "USR007",
    companyName: "深圳数码科技有限公司",
    businessLicensePhoto: "/uploads/license003.jpg",
    unifiedSocialCreditCode: "91440300MA3KXXXX3X",
    region: "广东省深圳市",
    enterpriseType: "股份有限公司",
    industry: "电子产品零售",
    legalPerson: "王五",
    idType: "身份证",
    idNumber: "440305198812123456",
    unionPayAccount: "6222021234567890789",
    contactPhone: "13700137003",
    authorizationDocument: "/uploads/auth003.pdf",
    accountName: "数码-新品首发",
    timezone: "Asia/Shanghai",
    currency: "CNY",
    deliveryMethod: "自助投放",
    promotionLink: "https://shuma.com/new",
    bcId: "BC004",
    internalStatus: "approved",
    mediaStatus: "approved",
    createdAt: "2026-03-08 16:45",
    updatedAt: "2026-03-09 10:30"
  },
  {
    id: "APP005",
    advertiserId: "ADV003",
    applicantId: "USR007",
    companyName: "深圳数码科技有限公司",
    businessLicensePhoto: "/uploads/license003.jpg",
    unifiedSocialCreditCode: "91440300MA3KXXXX3X",
    region: "广东省深圳市",
    enterpriseType: "股份有限公司",
    industry: "电子产品零售",
    legalPerson: "王五",
    idType: "护照",
    idNumber: "G12345678",
    unionPayAccount: "6222021234567890789",
    contactPhone: "13700137003",
    authorizationDocument: "/uploads/auth003.pdf",
    accountName: "数码-日本市场",
    timezone: "Asia/Tokyo",
    currency: "JPY",
    deliveryMethod: "代运营投放",
    promotionLink: "https://shuma-jp.com",
    bcId: "BC005",
    internalStatus: "rejected",
    mediaStatus: "reviewing",
    createdAt: "2026-03-11 11:00",
    updatedAt: "2026-03-12 09:00",
    remark: "资质材料不完整"
  },
  {
    id: "APP006",
    advertiserId: "ADV001",
    applicantId: "USR005",
    companyName: "杭州潮流服饰有限公司",
    businessLicensePhoto: "/uploads/license001.jpg",
    unifiedSocialCreditCode: "91330100MA2KXXXX1X",
    region: "浙江省杭州市",
    enterpriseType: "有限责任公司",
    industry: "服装零售",
    legalPerson: "张三",
    idType: "身份证",
    idNumber: "330102199001011234",
    unionPayAccount: "6222021234567890123",
    contactPhone: "13800138001",
    authorizationDocument: "/uploads/auth001.pdf",
    accountName: "潮流服饰-直播带货",
    timezone: "Asia/Shanghai",
    currency: "CNY",
    deliveryMethod: "自助投放",
    promotionLink: "https://chaoliu.com/live",
    bcId: "BC001",
    internalStatus: "pending",
    mediaStatus: "reviewing",
    createdAt: "2026-03-12 15:30",
    updatedAt: "2026-03-12 15:30"
  },
];

export const internalStatusLabels: Record<InternalReviewStatus, string> = {
  pending: "待确认",
  approved: "通过",
  rejected: "未通过",
};

export const mediaStatusLabels: Record<MediaReviewStatus, string> = {
  reviewing: "审核中",
  approved: "通过审核",
  rejected: "未通过审核",
};

// ============ 数据报表 - 广告投放数据 ============
// 维度类型
export type DimensionKey =
  | "date"           // 日期
  | "advertiser"     // 广告主
  | "adAccount"      // 广告账户
  | "campaign"       // 广告计划
  | "adGroup"        // 广告组
  | "creative"       // 创意
  | "platform"       // 平台
  | "country"        // 国家/地区
  | "placement"      // 版位
  | "os";            // 操作系统

// 维度配置
export const dimensionConfigs: { key: DimensionKey; label: string; description: string }[] = [
  { key: "date", label: "日期", description: "按日期查看数据" },
  { key: "advertiser", label: "广告主", description: "按广告主查看数据" },
  { key: "adAccount", label: "广告账户", description: "按广告账户查看数据" },
  { key: "campaign", label: "广告计划", description: "按广告计划查看数据" },
  { key: "adGroup", label: "广告组", description: "按广告组查看数据" },
  { key: "creative", label: "创意", description: "按创意查看数据" },
  { key: "platform", label: "平台", description: "按投放平台查看数据" },
  { key: "country", label: "国家/地区", description: "按国家/地区查看数据" },
  { key: "placement", label: "版位", description: "按版位查看数据" },
  { key: "os", label: "操作系统", description: "按操作系统查看数据" },
];

// 指标类型
export type MetricKey =
  // 基础指标
  | "impressions"        // 展示量
  | "clicks"             // 点击量
  | "ctr"                // 点击率
  | "cpc"                // 平均点击成本
  | "cpm"                // 千次展示成本
  | "spend"              // 消耗
  | "reach"              // 覆盖人数
  | "frequency"          // 频次
  // 视频指标
  | "videoViews"         // 视频播放量
  | "videoViews2s"       // 2秒播放量
  | "videoViews6s"       // 6秒播放量
  | "videoViewRate"      // 视频播放率
  | "avgWatchTime"       // 平均播放时长
  | "completionRate"     // 完播率
  | "videoProgress25"    // 播放进度25%
  | "videoProgress50"    // 播放进度50%
  | "videoProgress75"    // 播放进度75%
  // 转化指标
  | "conversions"        // 转化数
  | "conversionRate"     // 转化率
  | "costPerConversion"  // 转化成本
  | "conversionValue"    // 转化价值
  | "roas"               // ROAS
  | "cpa"                // CPA
  // 互动指标
  | "likes"              // 点赞数
  | "comments"           // 评论数
  | "shares"             // 分享数
  | "follows"            // 关注数
  | "profileVisits"      // 主页访问数
  | "messageClicks"      // 消息点击数
  // 商品指标
  | "productClicks"      // 商品点击数
  | "addToCart"          // 加购数
  | "checkouts"          // 下单数
  | "purchases"          // 支付数
  | "purchaseValue"      // 支付金额
  // 应用指标
  | "appInstalls"        // 应用安装数
  | "appLaunches"        // 应用激活数
  | "inAppPurchases"     // 应用内购买
  | "inAppEvents";       // 应用内事件

// 指标分组
export type MetricCategory = "basic" | "video" | "conversion" | "engagement" | "product" | "app";

// 指标配置
export const metricConfigs: { key: MetricKey; label: string; category: MetricCategory; format: (v: number) => string }[] = [
  // 基础指标
  { key: "impressions", label: "展示量", category: "basic", format: (v) => v.toLocaleString() },
  { key: "clicks", label: "点击量", category: "basic", format: (v) => v.toLocaleString() },
  { key: "ctr", label: "点击率(CTR)", category: "basic", format: (v) => `${v.toFixed(2)}%` },
  { key: "cpc", label: "平均点击成本(CPC)", category: "basic", format: (v) => `¥${v.toFixed(2)}` },
  { key: "cpm", label: "千次展示成本(CPM)", category: "basic", format: (v) => `¥${v.toFixed(2)}` },
  { key: "spend", label: "消耗", category: "basic", format: (v) => `¥${v.toLocaleString()}` },
  { key: "reach", label: "覆盖人数", category: "basic", format: (v) => v.toLocaleString() },
  { key: "frequency", label: "频次", category: "basic", format: (v) => v.toFixed(2) },
  // 视频指标
  { key: "videoViews", label: "视频播放量", category: "video", format: (v) => v.toLocaleString() },
  { key: "videoViews2s", label: "2秒播放量", category: "video", format: (v) => v.toLocaleString() },
  { key: "videoViews6s", label: "6秒播放量", category: "video", format: (v) => v.toLocaleString() },
  { key: "videoViewRate", label: "视频播放率", category: "video", format: (v) => `${v.toFixed(1)}%` },
  { key: "avgWatchTime", label: "平均播放时长", category: "video", format: (v) => `${v.toFixed(1)}秒` },
  { key: "completionRate", label: "完播率", category: "video", format: (v) => `${v.toFixed(1)}%` },
  { key: "videoProgress25", label: "播放进度25%", category: "video", format: (v) => v.toLocaleString() },
  { key: "videoProgress50", label: "播放进度50%", category: "video", format: (v) => v.toLocaleString() },
  { key: "videoProgress75", label: "播放进度75%", category: "video", format: (v) => v.toLocaleString() },
  // 转化指标
  { key: "conversions", label: "转化数", category: "conversion", format: (v) => v.toLocaleString() },
  { key: "conversionRate", label: "转化率(CVR)", category: "conversion", format: (v) => `${v.toFixed(2)}%` },
  { key: "costPerConversion", label: "转化成本(CPA)", category: "conversion", format: (v) => `¥${v.toFixed(2)}` },
  { key: "conversionValue", label: "转化价值", category: "conversion", format: (v) => `¥${v.toLocaleString()}` },
  { key: "roas", label: "ROAS", category: "conversion", format: (v) => v.toFixed(2) },
  { key: "cpa", label: "CPA", category: "conversion", format: (v) => `¥${v.toFixed(2)}` },
  // 互动指标
  { key: "likes", label: "点赞数", category: "engagement", format: (v) => v.toLocaleString() },
  { key: "comments", label: "评论数", category: "engagement", format: (v) => v.toLocaleString() },
  { key: "shares", label: "分享数", category: "engagement", format: (v) => v.toLocaleString() },
  { key: "follows", label: "关注数", category: "engagement", format: (v) => v.toLocaleString() },
  { key: "profileVisits", label: "主页访问数", category: "engagement", format: (v) => v.toLocaleString() },
  { key: "messageClicks", label: "消息点击数", category: "engagement", format: (v) => v.toLocaleString() },
  // 商品指标
  { key: "productClicks", label: "商品点击数", category: "product", format: (v) => v.toLocaleString() },
  { key: "addToCart", label: "加购数", category: "product", format: (v) => v.toLocaleString() },
  { key: "checkouts", label: "下单数", category: "product", format: (v) => v.toLocaleString() },
  { key: "purchases", label: "支付数", category: "product", format: (v) => v.toLocaleString() },
  { key: "purchaseValue", label: "支付金额", category: "product", format: (v) => `¥${v.toLocaleString()}` },
  // 应用指标
  { key: "appInstalls", label: "应用安装数", category: "app", format: (v) => v.toLocaleString() },
  { key: "appLaunches", label: "应用激活数", category: "app", format: (v) => v.toLocaleString() },
  { key: "inAppPurchases", label: "应用内购买", category: "app", format: (v) => v.toLocaleString() },
  { key: "inAppEvents", label: "应用内事件", category: "app", format: (v) => v.toLocaleString() },
];

// 指标分类标签
export const metricCategoryLabels: Record<MetricCategory, string> = {
  basic: "基础指标",
  video: "视频指标",
  conversion: "转化指标",
  engagement: "互动指标",
  product: "商品指标",
  app: "应用指标",
};

// 报表数据接口
export interface ReportRow {
  // 维度字段
  date: string;
  advertiserId: string;
  advertiserName: string;
  adAccountId: string;
  adAccountName: string;
  campaignId: string;
  campaignName: string;
  adGroupId: string;
  adGroupName: string;
  creativeId: string;
  creativeName: string;
  platform: string;
  country: string;
  placement: string;
  os: string;
  // 所有指标字段
  [key: string]: string | number;
}

// 按日期维度的报表数据
export const reportDataByDate: ReportRow[] = [
  { date: "2026-03-07", advertiserId: "", advertiserName: "", adAccountId: "", adAccountName: "", campaignId: "", campaignName: "", adGroupId: "", adGroupName: "", creativeId: "", creativeName: "", platform: "", country: "", placement: "", os: "", impressions: 1180000, clicks: 35400, ctr: 3.0, cpc: 0.43, cpm: 12.88, spend: 15200, reach: 890000, frequency: 1.33, videoViews: 920000, videoViews2s: 780000, videoViews6s: 520000, videoViewRate: 78.0, avgWatchTime: 8.5, completionRate: 18.2, videoProgress25: 690000, videoProgress50: 460000, videoProgress75: 230000, conversions: 708, conversionRate: 2.0, costPerConversion: 21.47, conversionValue: 76000, roas: 5.0, cpa: 21.47, likes: 12500, comments: 2100, shares: 890, follows: 1200, profileVisits: 4500, messageClicks: 680, productClicks: 5200, addToCart: 1560, checkouts: 708, purchases: 637, purchaseValue: 76000, appInstalls: 0, appLaunches: 0, inAppPurchases: 0, inAppEvents: 0 },
  { date: "2026-03-08", advertiserId: "", advertiserName: "", adAccountId: "", adAccountName: "", campaignId: "", campaignName: "", adGroupId: "", adGroupName: "", creativeId: "", creativeName: "", platform: "", country: "", placement: "", os: "", impressions: 1340000, clicks: 42880, ctr: 3.2, cpc: 0.42, cpm: 13.28, spend: 17800, reach: 1010000, frequency: 1.33, videoViews: 1050000, videoViews2s: 890000, videoViews6s: 600000, videoViewRate: 78.4, avgWatchTime: 8.8, completionRate: 19.1, videoProgress25: 790000, videoProgress50: 530000, videoProgress75: 260000, conversions: 857, conversionRate: 2.0, costPerConversion: 20.77, conversionValue: 89000, roas: 5.0, cpa: 20.77, likes: 14200, comments: 2400, shares: 1020, follows: 1350, profileVisits: 5200, messageClicks: 780, productClicks: 6100, addToCart: 1890, checkouts: 857, purchases: 771, purchaseValue: 89000, appInstalls: 0, appLaunches: 0, inAppPurchases: 0, inAppEvents: 0 },
  { date: "2026-03-09", advertiserId: "", advertiserName: "", adAccountId: "", adAccountName: "", campaignId: "", campaignName: "", adGroupId: "", adGroupName: "", creativeId: "", creativeName: "", platform: "", country: "", placement: "", os: "", impressions: 1260000, clicks: 39060, ctr: 3.1, cpc: 0.42, cpm: 13.10, spend: 16500, reach: 950000, frequency: 1.33, videoViews: 980000, videoViews2s: 830000, videoViews6s: 560000, videoViewRate: 77.8, avgWatchTime: 8.6, completionRate: 18.5, videoProgress25: 740000, videoProgress50: 490000, videoProgress75: 245000, conversions: 781, conversionRate: 2.0, costPerConversion: 21.13, conversionValue: 82500, roas: 5.0, cpa: 21.13, likes: 13100, comments: 2200, shares: 950, follows: 1280, profileVisits: 4800, messageClicks: 720, productClicks: 5600, addToCart: 1720, checkouts: 781, purchases: 703, purchaseValue: 82500, appInstalls: 0, appLaunches: 0, inAppPurchases: 0, inAppEvents: 0 },
  { date: "2026-03-10", advertiserId: "", advertiserName: "", adAccountId: "", adAccountName: "", campaignId: "", campaignName: "", adGroupId: "", adGroupName: "", creativeId: "", creativeName: "", platform: "", country: "", placement: "", os: "", impressions: 1520000, clicks: 50160, ctr: 3.3, cpc: 0.38, cpm: 12.63, spend: 19200, reach: 1140000, frequency: 1.33, videoViews: 1180000, videoViews2s: 1000000, videoViews6s: 680000, videoViewRate: 77.6, avgWatchTime: 9.1, completionRate: 20.3, videoProgress25: 890000, videoProgress50: 600000, videoProgress75: 300000, conversions: 1003, conversionRate: 2.0, costPerConversion: 19.14, conversionValue: 96000, roas: 5.0, cpa: 19.14, likes: 15800, comments: 2700, shares: 1150, follows: 1520, profileVisits: 5800, messageClicks: 860, productClicks: 7200, addToCart: 2210, checkouts: 1003, purchases: 903, purchaseValue: 96000, appInstalls: 0, appLaunches: 0, inAppPurchases: 0, inAppEvents: 0 },
  { date: "2026-03-11", advertiserId: "", advertiserName: "", adAccountId: "", adAccountName: "", campaignId: "", campaignName: "", adGroupId: "", adGroupName: "", creativeId: "", creativeName: "", platform: "", country: "", placement: "", os: "", impressions: 1680000, clicks: 58800, ctr: 3.5, cpc: 0.36, cpm: 12.74, spend: 21400, reach: 1260000, frequency: 1.33, videoViews: 1320000, videoViews2s: 1120000, videoViews6s: 760000, videoViewRate: 78.6, avgWatchTime: 9.3, completionRate: 21.0, videoProgress25: 1000000, videoProgress50: 670000, videoProgress75: 335000, conversions: 1176, conversionRate: 2.0, costPerConversion: 18.20, conversionValue: 107000, roas: 5.0, cpa: 18.20, likes: 17500, comments: 2950, shares: 1280, follows: 1680, profileVisits: 6500, messageClicks: 970, productClicks: 8400, addToCart: 2590, checkouts: 1176, purchases: 1058, purchaseValue: 107000, appInstalls: 0, appLaunches: 0, inAppPurchases: 0, inAppEvents: 0 },
  { date: "2026-03-12", advertiserId: "", advertiserName: "", adAccountId: "", adAccountName: "", campaignId: "", campaignName: "", adGroupId: "", adGroupName: "", creativeId: "", creativeName: "", platform: "", country: "", placement: "", os: "", impressions: 1450000, clicks: 47850, ctr: 3.3, cpc: 0.39, cpm: 13.03, spend: 18900, reach: 1090000, frequency: 1.33, videoViews: 1140000, videoViews2s: 970000, videoViews6s: 650000, videoViewRate: 78.6, avgWatchTime: 8.9, completionRate: 19.5, videoProgress25: 860000, videoProgress50: 580000, videoProgress75: 290000, conversions: 957, conversionRate: 2.0, costPerConversion: 19.75, conversionValue: 94500, roas: 5.0, cpa: 19.75, likes: 15300, comments: 2580, shares: 1100, follows: 1450, profileVisits: 5600, messageClicks: 840, productClicks: 6900, addToCart: 2120, checkouts: 957, purchases: 861, purchaseValue: 94500, appInstalls: 0, appLaunches: 0, inAppPurchases: 0, inAppEvents: 0 },
  { date: "2026-03-13", advertiserId: "", advertiserName: "", adAccountId: "", adAccountName: "", campaignId: "", campaignName: "", adGroupId: "", adGroupName: "", creativeId: "", creativeName: "", platform: "", country: "", placement: "", os: "", impressions: 1516000, clicks: 51544, ctr: 3.4, cpc: 0.37, cpm: 12.52, spend: 18970, reach: 1140000, frequency: 1.33, videoViews: 1185000, videoViews2s: 1005000, videoViews6s: 680000, videoViewRate: 78.2, avgWatchTime: 9.0, completionRate: 19.8, videoProgress25: 890000, videoProgress50: 600000, videoProgress75: 300000, conversions: 1031, conversionRate: 2.0, costPerConversion: 18.41, conversionValue: 94850, roas: 5.0, cpa: 18.41, likes: 16200, comments: 2750, shares: 1180, follows: 1550, profileVisits: 5900, messageClicks: 880, productClicks: 7400, addToCart: 2280, checkouts: 1031, purchases: 928, purchaseValue: 94850, appInstalls: 0, appLaunches: 0, inAppPurchases: 0, inAppEvents: 0 },
];

// 按广告主维度的报表数据
export const reportDataByAdvertiser: ReportRow[] = [
  { date: "", advertiserId: "ADV001", advertiserName: "潮流服饰旗舰店", adAccountId: "", adAccountName: "", campaignId: "", campaignName: "", adGroupId: "", adGroupName: "", creativeId: "", creativeName: "", platform: "", country: "", placement: "", os: "", impressions: 284000, clicks: 9088, ctr: 3.2, cpc: 0.42, cpm: 13.45, spend: 3820, reach: 215000, frequency: 1.32, videoViews: 220000, videoViews2s: 187000, videoViews6s: 126000, videoViewRate: 77.5, avgWatchTime: 8.7, completionRate: 19.2, videoProgress25: 166000, videoProgress50: 111000, videoProgress75: 55000, conversions: 182, conversionRate: 2.0, costPerConversion: 20.99, conversionValue: 19100, roas: 5.0, cpa: 20.99, likes: 3100, comments: 520, shares: 220, follows: 290, profileVisits: 1200, messageClicks: 180, productClicks: 1450, addToCart: 440, checkouts: 182, purchases: 164, purchaseValue: 19100, appInstalls: 0, appLaunches: 0, inAppPurchases: 0, inAppEvents: 0 },
  { date: "", advertiserId: "ADV003", advertiserName: "数码电子专营", adAccountId: "", adAccountName: "", campaignId: "", campaignName: "", adGroupId: "", adGroupName: "", creativeId: "", creativeName: "", platform: "", country: "", placement: "", os: "", impressions: 421000, clicks: 17261, ctr: 4.1, cpc: 0.30, cpm: 12.44, spend: 5240, reach: 318000, frequency: 1.32, videoViews: 330000, videoViews2s: 280000, videoViews6s: 189000, videoViewRate: 78.4, avgWatchTime: 9.5, completionRate: 21.5, videoProgress25: 249000, videoProgress50: 166000, videoProgress75: 83000, conversions: 345, conversionRate: 2.0, costPerConversion: 15.19, conversionValue: 26200, roas: 5.0, cpa: 15.19, likes: 4500, comments: 760, shares: 320, follows: 420, profileVisits: 1900, messageClicks: 280, productClicks: 2760, addToCart: 830, checkouts: 345, purchases: 311, purchaseValue: 26200, appInstalls: 0, appLaunches: 0, inAppPurchases: 0, inAppEvents: 0 },
  { date: "", advertiserId: "ADV007", advertiserName: "运动户外品牌", adAccountId: "", adAccountName: "", campaignId: "", campaignName: "", adGroupId: "", adGroupName: "", creativeId: "", creativeName: "", platform: "", country: "", placement: "", os: "", impressions: 356000, clicks: 13884, ctr: 3.9, cpc: 0.32, cpm: 12.30, spend: 4380, reach: 269000, frequency: 1.32, videoViews: 280000, videoViews2s: 238000, videoViews6s: 161000, videoViewRate: 78.7, avgWatchTime: 9.2, completionRate: 20.8, videoProgress25: 211000, videoProgress50: 141000, videoProgress75: 70000, conversions: 278, conversionRate: 2.0, costPerConversion: 15.75, conversionValue: 21900, roas: 5.0, cpa: 15.75, likes: 3800, comments: 640, shares: 280, follows: 350, profileVisits: 1600, messageClicks: 240, productClicks: 2220, addToCart: 670, checkouts: 278, purchases: 250, purchaseValue: 21900, appInstalls: 0, appLaunches: 0, inAppPurchases: 0, inAppEvents: 0 },
  { date: "", advertiserId: "ADV005", advertiserName: "健康食品专区", adAccountId: "", adAccountName: "", campaignId: "", campaignName: "", adGroupId: "", adGroupName: "", creativeId: "", creativeName: "", platform: "", country: "", placement: "", os: "", impressions: 178000, clicks: 6586, ctr: 3.7, cpc: 0.33, cpm: 12.08, spend: 2150, reach: 135000, frequency: 1.32, videoViews: 140000, videoViews2s: 119000, videoViews6s: 80000, videoViewRate: 78.7, avgWatchTime: 8.9, completionRate: 19.5, videoProgress25: 105000, videoProgress50: 70000, videoProgress75: 35000, conversions: 132, conversionRate: 2.0, costPerConversion: 16.29, conversionValue: 10750, roas: 5.0, cpa: 16.29, likes: 1900, comments: 320, shares: 140, follows: 170, profileVisits: 750, messageClicks: 110, productClicks: 1050, addToCart: 320, checkouts: 132, purchases: 119, purchaseValue: 10750, appInstalls: 0, appLaunches: 0, inAppPurchases: 0, inAppEvents: 0 },
  { date: "", advertiserId: "ADV002", advertiserName: "美妆护肤优选", adAccountId: "", adAccountName: "", campaignId: "", campaignName: "", adGroupId: "", adGroupName: "", creativeId: "", creativeName: "", platform: "", country: "", placement: "", os: "", impressions: 132000, clicks: 3696, ctr: 2.8, cpc: 0.42, cpm: 11.82, spend: 1560, reach: 100000, frequency: 1.32, videoViews: 105000, videoViews2s: 89000, videoViews6s: 60000, videoViewRate: 79.5, avgWatchTime: 8.4, completionRate: 18.8, videoProgress25: 79000, videoProgress50: 53000, videoProgress75: 26000, conversions: 74, conversionRate: 2.0, costPerConversion: 21.08, conversionValue: 7800, roas: 5.0, cpa: 21.08, likes: 1400, comments: 240, shares: 100, follows: 130, profileVisits: 550, messageClicks: 80, productClicks: 590, addToCart: 180, checkouts: 74, purchases: 67, purchaseValue: 7800, appInstalls: 0, appLaunches: 0, inAppPurchases: 0, inAppEvents: 0 },
  { date: "", advertiserId: "ADV008", advertiserName: "宠物用品专卖", adAccountId: "", adAccountName: "", campaignId: "", campaignName: "", adGroupId: "", adGroupName: "", creativeId: "", creativeName: "", platform: "", country: "", placement: "", os: "", impressions: 145000, clicks: 3625, ctr: 2.5, cpc: 0.50, cpm: 12.55, spend: 1820, reach: 110000, frequency: 1.32, videoViews: 110000, videoViews2s: 93000, videoViews6s: 63000, videoViewRate: 75.9, avgWatchTime: 8.1, completionRate: 17.2, videoProgress25: 83000, videoProgress50: 55000, videoProgress75: 28000, conversions: 73, conversionRate: 2.0, costPerConversion: 24.93, conversionValue: 9100, roas: 5.0, cpa: 24.93, likes: 1500, comments: 270, shares: 120, follows: 150, profileVisits: 600, messageClicks: 90, productClicks: 580, addToCart: 180, checkouts: 73, purchases: 66, purchaseValue: 9100, appInstalls: 0, appLaunches: 0, inAppPurchases: 0, inAppEvents: 0 },
];

// 按广告计划维度的报表数据
export const reportDataByCampaign: ReportRow[] = [
  { date: "", advertiserId: "ADV001", advertiserName: "潮流服饰旗舰店", adAccountId: "", adAccountName: "", campaignId: "CAM001", campaignName: "春季新品推广-短袖系列", adGroupId: "", adGroupName: "", creativeId: "", creativeName: "", platform: "", country: "", placement: "", os: "", impressions: 284000, clicks: 9088, ctr: 3.2, cpc: 0.42, cpm: 13.45, spend: 3820, reach: 215000, frequency: 1.32, videoViews: 220000, videoViews2s: 187000, videoViews6s: 126000, videoViewRate: 77.5, avgWatchTime: 8.7, completionRate: 19.2, videoProgress25: 166000, videoProgress50: 111000, videoProgress75: 55000, conversions: 182, conversionRate: 2.0, costPerConversion: 20.99, conversionValue: 19100, roas: 5.0, cpa: 20.99, likes: 3100, comments: 520, shares: 220, follows: 290, profileVisits: 1200, messageClicks: 180, productClicks: 1450, addToCart: 440, checkouts: 182, purchases: 164, purchaseValue: 19100, appInstalls: 0, appLaunches: 0, inAppPurchases: 0, inAppEvents: 0 },
  { date: "", advertiserId: "ADV003", advertiserName: "数码电子专营", adAccountId: "", adAccountName: "", campaignId: "CAM002", campaignName: "618预热-手机配件", adGroupId: "", adGroupName: "", creativeId: "", creativeName: "", platform: "", country: "", placement: "", os: "", impressions: 421000, clicks: 17261, ctr: 4.1, cpc: 0.30, cpm: 12.44, spend: 5240, reach: 318000, frequency: 1.32, videoViews: 330000, videoViews2s: 280000, videoViews6s: 189000, videoViewRate: 78.4, avgWatchTime: 9.5, completionRate: 21.5, videoProgress25: 249000, videoProgress50: 166000, videoProgress75: 83000, conversions: 345, conversionRate: 2.0, costPerConversion: 15.19, conversionValue: 26200, roas: 5.0, cpa: 15.19, likes: 4500, comments: 760, shares: 320, follows: 420, profileVisits: 1900, messageClicks: 280, productClicks: 2760, addToCart: 830, checkouts: 345, purchases: 311, purchaseValue: 26200, appInstalls: 0, appLaunches: 0, inAppPurchases: 0, inAppEvents: 0 },
  { date: "", advertiserId: "ADV007", advertiserName: "运动户外品牌", adAccountId: "", adAccountName: "", campaignId: "CAM003", campaignName: "马拉松赛季装备推广", adGroupId: "", adGroupName: "", creativeId: "", creativeName: "", platform: "", country: "", placement: "", os: "", impressions: 356000, clicks: 13884, ctr: 3.9, cpc: 0.32, cpm: 12.30, spend: 4380, reach: 269000, frequency: 1.32, videoViews: 280000, videoViews2s: 238000, videoViews6s: 161000, videoViewRate: 78.7, avgWatchTime: 9.2, completionRate: 20.8, videoProgress25: 211000, videoProgress50: 141000, videoProgress75: 70000, conversions: 278, conversionRate: 2.0, costPerConversion: 15.75, conversionValue: 21900, roas: 5.0, cpa: 15.75, likes: 3800, comments: 640, shares: 280, follows: 350, profileVisits: 1600, messageClicks: 240, productClicks: 2220, addToCart: 670, checkouts: 278, purchases: 250, purchaseValue: 21900, appInstalls: 0, appLaunches: 0, inAppPurchases: 0, inAppEvents: 0 },
];

// 按平台维度的报表数据
export const reportDataByPlatform: ReportRow[] = [
  { date: "", advertiserId: "", advertiserName: "", adAccountId: "", adAccountName: "", campaignId: "", campaignName: "", adGroupId: "", adGroupName: "", creativeId: "", creativeName: "", platform: "TikTok", country: "", placement: "", os: "", impressions: 6500000, clicks: 214500, ctr: 3.3, cpc: 0.39, cpm: 12.65, spend: 82250, reach: 4900000, frequency: 1.33, videoViews: 5100000, videoViews2s: 4335000, videoViews6s: 2930000, videoViewRate: 78.5, avgWatchTime: 8.9, completionRate: 19.5, videoProgress25: 3850000, videoProgress50: 2570000, videoProgress75: 1285000, conversions: 4290, conversionRate: 2.0, costPerConversion: 19.17, conversionValue: 411250, roas: 5.0, cpa: 19.17, likes: 68000, comments: 11500, shares: 4900, follows: 6500, profileVisits: 25000, messageClicks: 3700, productClicks: 34300, addToCart: 10500, checkouts: 4290, purchases: 3860, purchaseValue: 411250, appInstalls: 0, appLaunches: 0, inAppPurchases: 0, inAppEvents: 0 },
  { date: "", advertiserId: "", advertiserName: "", adAccountId: "", adAccountName: "", campaignId: "", campaignName: "", adGroupId: "", adGroupName: "", creativeId: "", creativeName: "", platform: "Pangle", country: "", placement: "", os: "", impressions: 2200000, clicks: 70400, ctr: 3.2, cpc: 0.40, cpm: 12.72, spend: 28000, reach: 1660000, frequency: 1.33, videoViews: 1720000, videoViews2s: 1462000, videoViews6s: 990000, videoViewRate: 78.2, avgWatchTime: 8.7, completionRate: 19.0, videoProgress25: 1300000, videoProgress50: 870000, videoProgress75: 435000, conversions: 1408, conversionRate: 2.0, costPerConversion: 19.89, conversionValue: 140000, roas: 5.0, cpa: 19.89, likes: 22000, comments: 3700, shares: 1600, follows: 2100, profileVisits: 8500, messageClicks: 1200, productClicks: 11200, addToCart: 3450, checkouts: 1408, purchases: 1267, purchaseValue: 140000, appInstalls: 0, appLaunches: 0, inAppPurchases: 0, inAppEvents: 0 },
];

// 兼容旧数据
export const analyticsByDate = reportDataByDate;
export const analyticsByAdvertiser = reportDataByAdvertiser;
export type AnalyticsData = ReportRow;
export type AnalyticsDimension = DimensionKey;

// ============ 代理商考核指标 ============
export interface PerformanceMetrics {
  salesId: string;                       // 销售ID
  salesName: string;                     // 销售名称
  // 客户封户率
  totalAdvertisers: number;              // 总客户数
  blockedAdvertisers: number;            // 封户客户数
  advertiserBlockRate: number;           // 客户封户率 %
  // BC封户率
  totalBCs: number;                      // 总BC数
  blockedBCs: number;                    // 封户BC数
  bcBlockRate: number;                   // BC封户率 %
  // 季度累计指标
  quarterSpend: number;                  // 季度累计消耗金额
  quarterNewAccounts: number;            // 季度累计新开户数量
  quarterNewEntities: number;            // 季度累计新增主体数量
  quarterNewActiveEntities: number;      // 季度累计新增有消耗主体数量
  quarterNewApps: number;                // 季度累计新增APP数量
  quarterActiveApps: number;             // 季度累计有消耗APP数量
}

export const performanceMetrics: PerformanceMetrics[] = [
  {
    salesId: "USR004",
    salesName: "赵销售",
    totalAdvertisers: 4,
    blockedAdvertisers: 0,
    advertiserBlockRate: 0,
    totalBCs: 6,
    blockedBCs: 0,
    bcBlockRate: 0,
    quarterSpend: 118550,
    quarterNewAccounts: 8,
    quarterNewEntities: 4,
    quarterNewActiveEntities: 4,
    quarterNewApps: 5,
    quarterActiveApps: 12,
  },
  {
    salesId: "USR009",
    salesName: "刘销售",
    totalAdvertisers: 4,
    blockedAdvertisers: 1,
    advertiserBlockRate: 25.0,
    totalBCs: 6,
    blockedBCs: 2,
    bcBlockRate: 33.3,
    quarterSpend: 71510,
    quarterNewAccounts: 6,
    quarterNewEntities: 4,
    quarterNewActiveEntities: 2,
    quarterNewApps: 3,
    quarterActiveApps: 8,
  },
];

// 整体考核汇总
export const overallPerformance = {
  totalAdvertisers: 8,
  blockedAdvertisers: 1,
  advertiserBlockRate: 12.5,
  totalBCs: 12,
  blockedBCs: 2,
  bcBlockRate: 16.7,
  quarterSpend: 190060,
  quarterNewAccounts: 14,
  quarterNewEntities: 8,
  quarterNewActiveEntities: 6,
  quarterNewApps: 8,
  quarterActiveApps: 20,
};

// ============ 财务管理数据 ============

// 合同状态
export type ContractStatus = "active" | "expiring" | "expired" | "terminated";
export type PaymentStatus = "pending" | "partial" | "completed" | "overdue";
export type SettlementStatus = "pending" | "confirmed" | "invoiced" | "paid";

// 合作政策类型
export type PolicyType = "standard" | "silver" | "gold" | "platinum" | "custom";

// 合同信息
export interface Contract {
  id: string;
  advertiserId: string;
  advertiserName: string;
  contractNo: string;           // 合同编号
  contractName: string;         // 合同名称
  startDate: string;            // 开始日期
  endDate: string;              // 结束日期
  contractAmount: number;       // 合同金额
  status: ContractStatus;       // 合同状态
  policyType: PolicyType;       // 合作政策
  serviceFeeRate: number;       // 服务费率 %
  creditLimit: number;          // 授信额度
  paymentCycle: number;         // 结算周期(天)
  signedBy: string;             // 签约人
  signedDate: string;           // 签约日期
  attachments: string[];        // 附件
  remark?: string;
}

// 结算记录
export interface Settlement {
  id: string;
  advertiserId: string;
  advertiserName: string;
  period: string;               // 结算周期 2026-03
  startDate: string;            // 结算开始日期
  endDate: string;              // 结算结束日期
  totalSpend: number;           // 总消耗
  serviceFee: number;           // 服务费
  totalAmount: number;          // 结算总金额
  status: SettlementStatus;     // 结算状态
  invoiceNo?: string;           // 发票号
  invoiceDate?: string;         // 开票日期
  paymentDueDate: string;       // 应付款日期
  paidDate?: string;            // 实际付款日期
  createdAt: string;
}

// 回款记录
export interface PaymentRecord {
  id: string;
  advertiserId: string;
  advertiserName: string;
  settlementId: string;         // 关联结算单
  amount: number;               // 回款金额
  paymentMethod: string;        // 回款方式
  paymentDate: string;          // 回款日期
  bankAccount?: string;         // 银行账户
  bankName?: string;            // 银行名称
  remark?: string;
  createdBy: string;            // 录入人
  createdAt: string;
}

// 广告主财务信息
export interface AdvertiserFinance {
  advertiserId: string;
  advertiserName: string;
  // 账户信息
  balance: number;              // 账户余额
  creditLimit: number;          // 授信额度
  creditUsed: number;           // 已用授信
  availableCredit: number;      // 可用授信
  // 本月数据
  monthSpend: number;           // 本月消耗
  monthRecharge: number;        // 本月充值
  monthPayment: number;         // 本月回款
  // 累计数据
  totalSpend: number;           // 累计消耗
  totalRecharge: number;        // 累计充值
  totalPayment: number;         // 累计回款
  // 欠款信息
  outstandingAmount: number;    // 欠款金额
  overdueAmount: number;        // 逾期金额
  overdueDays: number;          // 逾期天数
  // 合同信息
  contractId: string;
  contractNo: string;
  contractEndDate: string;
  contractStatus: ContractStatus;
  policyType: PolicyType;
  // 联系信息
  financeContact: string;       // 财务联系人
  financePhone: string;         // 财务电话
  financeEmail: string;         // 财务邮箱
}

// 合作政策配置
export const policyConfigs: { type: PolicyType; label: string; color: string; serviceFeeRange: string; creditRange: string; benefits: string[] }[] = [
  { type: "standard", label: "标准版", color: "#888888", serviceFeeRange: "5%-8%", creditRange: "0-5万", benefits: ["基础服务支持", "常规结算周期"] },
  { type: "silver", label: "银牌版", color: "#C0C0C0", serviceFeeRange: "4%-6%", creditRange: "5-20万", benefits: ["专属客服", "优先审核", "月结服务"] },
  { type: "gold", label: "金牌版", color: "#FFD700", serviceFeeRange: "3%-5%", creditRange: "20-50万", benefits: ["专属运营团队", "绿色通道", "季度返点", "授信支持"] },
  { type: "platinum", label: "白金版", color: "#E5E4E2", serviceFeeRange: "2%-4%", creditRange: "50万+", benefits: ["专属客户经理", "24h响应", "高额授信", "年度返点", "定制服务"] },
  { type: "custom", label: "定制版", color: "#FE2C55", serviceFeeRange: "协商", creditRange: "协商", benefits: ["完全定制服务", "专属团队"] },
];

// 合同数据
export const contracts: Contract[] = [
  { id: "CON001", advertiserId: "ADV001", advertiserName: "潮流服饰旗舰店", contractNo: "HT-2025-001", contractName: "年度广告投放合作协议", startDate: "2025-06-01", endDate: "2026-05-31", contractAmount: 100000, status: "active", policyType: "gold", serviceFeeRate: 4.0, creditLimit: 30000, paymentCycle: 30, signedBy: "赵销售", signedDate: "2025-05-28", attachments: ["/contracts/CON001.pdf"], remark: "年度框架协议" },
  { id: "CON002", advertiserId: "ADV002", advertiserName: "美妆护肤优选", contractNo: "HT-2025-002", contractName: "广告投放服务合同", startDate: "2025-06-15", endDate: "2026-06-14", contractAmount: 50000, status: "active", policyType: "silver", serviceFeeRate: 5.5, creditLimit: 15000, paymentCycle: 30, signedBy: "赵销售", signedDate: "2025-06-10", attachments: ["/contracts/CON002.pdf"] },
  { id: "CON003", advertiserId: "ADV003", advertiserName: "数码电子专营", contractNo: "HT-2025-003", contractName: "年度战略合作协议", startDate: "2025-07-01", endDate: "2026-06-30", contractAmount: 200000, status: "active", policyType: "platinum", serviceFeeRate: 3.0, creditLimit: 80000, paymentCycle: 45, signedBy: "刘销售", signedDate: "2025-06-25", attachments: ["/contracts/CON003.pdf"], remark: "战略合作伙伴" },
  { id: "CON004", advertiserId: "ADV004", advertiserName: "母婴生活馆", contractNo: "HT-2025-004", contractName: "广告投放服务合同", startDate: "2025-10-01", endDate: "2026-03-31", contractAmount: 30000, status: "expiring", policyType: "standard", serviceFeeRate: 6.0, creditLimit: 5000, paymentCycle: 15, signedBy: "刘销售", signedDate: "2025-09-25", attachments: ["/contracts/CON004.pdf"], remark: "合同即将到期，需续签" },
  { id: "CON005", advertiserId: "ADV005", advertiserName: "健康食品专区", contractNo: "HT-2025-005", contractName: "广告投放服务合同", startDate: "2025-08-01", endDate: "2026-07-31", contractAmount: 80000, status: "active", policyType: "gold", serviceFeeRate: 4.5, creditLimit: 25000, paymentCycle: 30, signedBy: "赵销售", signedDate: "2025-07-25", attachments: ["/contracts/CON005.pdf"] },
  { id: "CON006", advertiserId: "ADV006", advertiserName: "家居装饰商城", contractNo: "HT-2025-006", contractName: "广告投放服务合同", startDate: "2025-11-01", endDate: "2026-04-30", contractAmount: 20000, status: "expired", policyType: "standard", serviceFeeRate: 7.0, creditLimit: 3000, paymentCycle: 15, signedBy: "刘销售", signedDate: "2025-10-28", attachments: ["/contracts/CON006.pdf"], remark: "合同已过期" },
  { id: "CON007", advertiserId: "ADV007", advertiserName: "运动户外品牌", contractNo: "HT-2025-007", contractName: "年度广告投放合作协议", startDate: "2025-07-15", endDate: "2026-07-14", contractAmount: 120000, status: "active", policyType: "gold", serviceFeeRate: 4.0, creditLimit: 35000, paymentCycle: 30, signedBy: "赵销售", signedDate: "2025-07-10", attachments: ["/contracts/CON007.pdf"] },
  { id: "CON008", advertiserId: "ADV008", advertiserName: "宠物用品专卖", contractNo: "HT-2025-008", contractName: "广告投放服务合同", startDate: "2025-09-01", endDate: "2026-08-31", contractAmount: 40000, status: "active", policyType: "silver", serviceFeeRate: 5.0, creditLimit: 10000, paymentCycle: 30, signedBy: "刘销售", signedDate: "2025-08-28", attachments: ["/contracts/CON008.pdf"] },
];

// 本月结算数据
export const settlements: Settlement[] = [
  { id: "SET001", advertiserId: "ADV001", advertiserName: "潮流服饰旗舰店", period: "2026-03", startDate: "2026-03-01", endDate: "2026-03-31", totalSpend: 52000, serviceFee: 2080, totalAmount: 54080, status: "confirmed", paymentDueDate: "2026-04-15", createdAt: "2026-03-01" },
  { id: "SET002", advertiserId: "ADV002", advertiserName: "美妆护肤优选", period: "2026-03", startDate: "2026-03-01", endDate: "2026-03-31", totalSpend: 28000, serviceFee: 1540, totalAmount: 29540, status: "pending", paymentDueDate: "2026-04-15", createdAt: "2026-03-01" },
  { id: "SET003", advertiserId: "ADV003", advertiserName: "数码电子专营", period: "2026-03", startDate: "2026-03-01", endDate: "2026-03-31", totalSpend: 95000, serviceFee: 2850, totalAmount: 97850, status: "invoiced", invoiceNo: "INV-2026-03-001", invoiceDate: "2026-03-10", paymentDueDate: "2026-04-15", createdAt: "2026-03-01" },
  { id: "SET004", advertiserId: "ADV004", advertiserName: "母婴生活馆", period: "2026-03", startDate: "2026-03-01", endDate: "2026-03-31", totalSpend: 8000, serviceFee: 480, totalAmount: 8480, status: "pending", paymentDueDate: "2026-04-15", createdAt: "2026-03-01" },
  { id: "SET005", advertiserId: "ADV005", advertiserName: "健康食品专区", period: "2026-03", startDate: "2026-03-01", endDate: "2026-03-31", totalSpend: 42000, serviceFee: 1890, totalAmount: 43890, status: "paid", invoiceNo: "INV-2026-03-002", invoiceDate: "2026-03-08", paymentDueDate: "2026-04-15", paidDate: "2026-03-12", createdAt: "2026-03-01" },
  { id: "SET006", advertiserId: "ADV007", advertiserName: "运动户外品牌", period: "2026-03", startDate: "2026-03-01", endDate: "2026-03-31", totalSpend: 68000, serviceFee: 2720, totalAmount: 70720, status: "confirmed", paymentDueDate: "2026-04-15", createdAt: "2026-03-01" },
  { id: "SET007", advertiserId: "ADV008", advertiserName: "宠物用品专卖", period: "2026-03", startDate: "2026-03-01", endDate: "2026-03-31", totalSpend: 22000, serviceFee: 1100, totalAmount: 23100, status: "pending", paymentDueDate: "2026-04-15", createdAt: "2026-03-01" },
];

// 回款记录
export const paymentRecords: PaymentRecord[] = [
  { id: "PAY001", advertiserId: "ADV001", advertiserName: "潮流服饰旗舰店", settlementId: "SET001", amount: 30000, paymentMethod: "银行转账", paymentDate: "2026-03-05", bankAccount: "622202****1234", bankName: "工商银行", createdBy: "王财务", createdAt: "2026-03-05 14:30" },
  { id: "PAY002", advertiserId: "ADV001", advertiserName: "潮流服饰旗舰店", settlementId: "SET001", amount: 24080, paymentMethod: "银行转账", paymentDate: "2026-03-10", bankAccount: "622202****1234", bankName: "工商银行", createdBy: "王财务", createdAt: "2026-03-10 16:20" },
  { id: "PAY003", advertiserId: "ADV003", advertiserName: "数码电子专营", settlementId: "", amount: 50000, paymentMethod: "银行转账", paymentDate: "2026-03-08", bankAccount: "622848****5678", bankName: "建设银行", remark: "预付款", createdBy: "王财务", createdAt: "2026-03-08 10:15" },
  { id: "PAY004", advertiserId: "ADV005", advertiserName: "健康食品专区", settlementId: "SET005", amount: 43890, paymentMethod: "银行转账", paymentDate: "2026-03-12", bankAccount: "621700****9012", bankName: "招商银行", createdBy: "王财务", createdAt: "2026-03-12 09:45" },
  { id: "PAY005", advertiserId: "ADV007", advertiserName: "运动户外品牌", settlementId: "", amount: 35000, paymentMethod: "银行转账", paymentDate: "2026-03-11", bankAccount: "622588****3456", bankName: "浦发银行", remark: "充值款", createdBy: "王财务", createdAt: "2026-03-11 15:00" },
];

// 广告主财务汇总
export const advertiserFinances: AdvertiserFinance[] = [
  { advertiserId: "ADV001", advertiserName: "潮流服饰旗舰店", balance: 45200, creditLimit: 30000, creditUsed: 0, availableCredit: 30000, monthSpend: 52000, monthRecharge: 54080, monthPayment: 54080, totalSpend: 520000, totalRecharge: 565000, totalPayment: 519720, outstandingAmount: 0, overdueAmount: 0, overdueDays: 0, contractId: "CON001", contractNo: "HT-2025-001", contractEndDate: "2026-05-31", contractStatus: "active", policyType: "gold", financeContact: "张财务", financePhone: "13800001111", financeEmail: "finance@chaoliu.com" },
  { advertiserId: "ADV002", advertiserName: "美妆护肤优选", balance: 12800, creditLimit: 15000, creditUsed: 0, availableCredit: 15000, monthSpend: 28000, monthRecharge: 30000, monthPayment: 15000, totalSpend: 280000, totalRecharge: 292800, totalPayment: 280000, outstandingAmount: 12800, overdueAmount: 0, overdueDays: 0, contractId: "CON002", contractNo: "HT-2025-002", contractEndDate: "2026-06-14", contractStatus: "active", policyType: "silver", financeContact: "李财务", financePhone: "13900002222", financeEmail: "finance@meizhuang.com" },
  { advertiserId: "ADV003", advertiserName: "数码电子专营", balance: 67500, creditLimit: 80000, creditUsed: 20000, availableCredit: 60000, monthSpend: 95000, monthRecharge: 100000, monthPayment: 50000, totalSpend: 950000, totalRecharge: 1017500, totalPayment: 950000, outstandingAmount: 0, overdueAmount: 0, overdueDays: 0, contractId: "CON003", contractNo: "HT-2025-003", contractEndDate: "2026-06-30", contractStatus: "active", policyType: "platinum", financeContact: "王财务", financePhone: "13700003333", financeEmail: "finance@shuma.com" },
  { advertiserId: "ADV004", advertiserName: "母婴生活馆", balance: 3200, creditLimit: 5000, creditUsed: 5000, availableCredit: 0, monthSpend: 8000, monthRecharge: 5000, monthPayment: 0, totalSpend: 80000, totalRecharge: 78200, totalPayment: 71800, outstandingAmount: 5000, overdueAmount: 3000, overdueDays: 15, contractId: "CON004", contractNo: "HT-2025-004", contractEndDate: "2026-03-31", contractStatus: "expiring", policyType: "standard", financeContact: "陈财务", financePhone: "13600004444", financeEmail: "finance@muying.com" },
  { advertiserId: "ADV005", advertiserName: "健康食品专区", balance: 28900, creditLimit: 25000, creditUsed: 0, availableCredit: 25000, monthSpend: 42000, monthRecharge: 43890, monthPayment: 43890, totalSpend: 420000, totalRecharge: 448900, totalPayment: 420000, outstandingAmount: 0, overdueAmount: 0, overdueDays: 0, contractId: "CON005", contractNo: "HT-2025-005", contractEndDate: "2026-07-31", contractStatus: "active", policyType: "gold", financeContact: "刘财务", financePhone: "13500005555", financeEmail: "finance@jiankang.com" },
  { advertiserId: "ADV006", advertiserName: "家居装饰商城", balance: 850, creditLimit: 3000, creditUsed: 3000, availableCredit: 0, monthSpend: 0, monthRecharge: 0, monthPayment: 0, totalSpend: 50000, totalRecharge: 47000, totalPayment: 46150, outstandingAmount: 3000, overdueAmount: 3000, overdueDays: 45, contractId: "CON006", contractNo: "HT-2025-006", contractEndDate: "2026-04-30", contractStatus: "expired", policyType: "standard", financeContact: "周财务", financePhone: "13400006666", financeEmail: "finance@jiaju.com" },
  { advertiserId: "ADV007", advertiserName: "运动户外品牌", balance: 52100, creditLimit: 35000, creditUsed: 0, availableCredit: 35000, monthSpend: 68000, monthRecharge: 70000, monthPayment: 35000, totalSpend: 680000, totalRecharge: 732100, totalPayment: 680000, outstandingAmount: 35000, overdueAmount: 0, overdueDays: 0, contractId: "CON007", contractNo: "HT-2025-007", contractEndDate: "2026-07-14", contractStatus: "active", policyType: "gold", financeContact: "吴财务", financePhone: "13300007777", financeEmail: "finance@yundong.com" },
  { advertiserId: "ADV008", advertiserName: "宠物用品专卖", balance: 19400, creditLimit: 10000, creditUsed: 0, availableCredit: 10000, monthSpend: 22000, monthRecharge: 25000, monthPayment: 20000, totalSpend: 220000, totalRecharge: 239400, totalPayment: 220000, outstandingAmount: 0, overdueAmount: 0, overdueDays: 0, contractId: "CON008", contractNo: "HT-2025-008", contractEndDate: "2026-08-31", contractStatus: "active", policyType: "silver", financeContact: "赵财务", financePhone: "13200008888", financeEmail: "finance@chongwu.com" },
];

// 状态标签
export const contractStatusLabels: Record<ContractStatus, string> = {
  active: "生效中",
  expiring: "即将到期",
  expired: "已过期",
  terminated: "已终止",
};

export const paymentStatusLabels: Record<PaymentStatus, string> = {
  pending: "待回款",
  partial: "部分回款",
  completed: "已回款",
  overdue: "逾期",
};

export const settlementStatusLabels: Record<SettlementStatus, string> = {
  pending: "待确认",
  confirmed: "已确认",
  invoiced: "已开票",
  paid: "已付款",
};

// 财务汇总统计
export const financeSummary = {
  totalBalance: 230850,           // 总余额
  totalCreditLimit: 203000,       // 总授信额度
  totalCreditUsed: 28000,         // 已用授信
  monthTotalSpend: 315000,        // 本月总消耗
  monthTotalRecharge: 328890,     // 本月总充值
  monthTotalPayment: 217970,      // 本月总回款
  totalOutstanding: 43000,        // 总欠款
  totalOverdue: 3000,             // 逾期金额
  expiringContracts: 1,           // 即将到期合同数
  overdueAccounts: 2,             // 逾期账户数
};
