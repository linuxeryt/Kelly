export const advertisers = [
  { id: "ADV001", name: "潮流服饰旗舰店", balance: 45200, totalBudget: 80000, status: "active", todaySpend: 3820, impressions: 284000, ctr: 3.2, campaigns: 8 },
  { id: "ADV002", name: "美妆护肤优选", balance: 12800, totalBudget: 30000, status: "active", todaySpend: 1560, impressions: 132000, ctr: 2.8, campaigns: 5 },
  { id: "ADV003", name: "数码电子专营", balance: 67500, totalBudget: 100000, status: "active", todaySpend: 5240, impressions: 421000, ctr: 4.1, campaigns: 12 },
  { id: "ADV004", name: "母婴生活馆", balance: 3200, totalBudget: 20000, status: "paused", todaySpend: 0, impressions: 0, ctr: 0, campaigns: 3 },
  { id: "ADV005", name: "健康食品专区", balance: 28900, totalBudget: 50000, status: "active", todaySpend: 2150, impressions: 178000, ctr: 3.7, campaigns: 6 },
  { id: "ADV006", name: "家居装饰商城", balance: 850, totalBudget: 15000, status: "inactive", todaySpend: 0, impressions: 0, ctr: 0, campaigns: 2 },
  { id: "ADV007", name: "运动户外品牌", balance: 52100, totalBudget: 70000, status: "active", todaySpend: 4380, impressions: 356000, ctr: 3.9, campaigns: 9 },
  { id: "ADV008", name: "宠物用品专卖", balance: 19400, totalBudget: 25000, status: "active", todaySpend: 1820, impressions: 145000, ctr: 2.5, campaigns: 4 },
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
