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

export interface AccountApplication {
  id: string;              // 申请编号
  advertiserId: string;    // 广告主ID
  applicantId: string;     // 申请人ID（用户ID）
  companyName: string;     // 开户主体
  accountName: string;     // 广告账户名称
  bcId: string;            // BC ID
  internalStatus: InternalReviewStatus;  // 内部审核状态
  mediaStatus: MediaReviewStatus;        // 媒体状态
  createdAt: string;       // 申请时间
  updatedAt: string;       // 更新时间
  remark?: string;         // 备注
}

export const accountApplications: AccountApplication[] = [
  { id: "APP001", advertiserId: "ADV001", applicantId: "USR005", companyName: "杭州潮流服饰有限公司", accountName: "潮流服饰-夏季推广", bcId: "BC001", internalStatus: "approved", mediaStatus: "approved", createdAt: "2026-03-01 10:30", updatedAt: "2026-03-02 14:00", remark: "夏季新品推广账户" },
  { id: "APP002", advertiserId: "ADV001", applicantId: "USR005", companyName: "杭州潮流服饰有限公司", accountName: "潮流服饰-品牌形象", bcId: "BC002", internalStatus: "approved", mediaStatus: "reviewing", createdAt: "2026-03-05 09:15", updatedAt: "2026-03-06 11:00", remark: "海外品牌推广" },
  { id: "APP003", advertiserId: "ADV002", applicantId: "USR006", companyName: "上海美妆科技有限公司", accountName: "美妆-618大促", bcId: "BC003", internalStatus: "pending", mediaStatus: "reviewing", createdAt: "2026-03-10 14:20", updatedAt: "2026-03-10 14:20", remark: "618活动专用账户" },
  { id: "APP004", advertiserId: "ADV003", applicantId: "USR007", companyName: "深圳数码科技有限公司", accountName: "数码-新品首发", bcId: "BC004", internalStatus: "approved", mediaStatus: "approved", createdAt: "2026-03-08 16:45", updatedAt: "2026-03-09 10:30" },
  { id: "APP005", advertiserId: "ADV003", applicantId: "USR007", companyName: "深圳数码科技有限公司", accountName: "数码-日本市场", bcId: "BC005", internalStatus: "rejected", mediaStatus: "reviewing", createdAt: "2026-03-11 11:00", updatedAt: "2026-03-12 09:00", remark: "资质材料不完整" },
  { id: "APP006", advertiserId: "ADV001", applicantId: "USR005", companyName: "杭州潮流服饰有限公司", accountName: "潮流服饰-直播带货", bcId: "BC001", internalStatus: "pending", mediaStatus: "reviewing", createdAt: "2026-03-12 15:30", updatedAt: "2026-03-12 15:30" },
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
