type EditorialFocus = {
  mechanism: string;
  risk: string;
  metric: string;
  boundary: string;
};

const batchCFocus: Record<string, EditorialFocus> = {
  "chatgpt-shopping-rewrites-ecommerce-funnel": { mechanism: "候选集、商品属性、评价证据与结算之间的交接", risk: "把平台给出的推荐顺序误认成完整比较", metric: "候选覆盖率、被采纳推荐的退货率与复购质量", boundary: "对话缩短路径不应取消价格、来源与替代方案的可见性" },
  "personal-context-as-ai-moat": { mechanism: "收集、校正、召回、删除和迁移个人信息的完整循环", risk: "把保存更多信息等同于真正理解一个人", metric: "正确召回率、错误引用率、用户纠正后的生效速度", boundary: "记忆必须服从用户当前意愿，而不是绑住用户的过去" },
  "enterprise-ai-bottleneck-is-permissions": { mechanism: "身份、任务目的、数据范围、工具权限和审计记录的逐层绑定", risk: "为了让演示顺畅而给 Agent 过宽的长期权限", metric: "越权阻断率、授权请求质量、撤销后的生效时间", boundary: "模型再强也不应绕过组织原有的责任与审批链" },
  "ai-super-app-vs-vertical-agent": { mechanism: "通用入口的意图聚合与垂直系统的专业交付之间的分工", risk: "把占据入口误认为已经拥有领域责任", metric: "从首次表达需求到可验收结果的完成率和迁移成本", boundary: "入口可以统一，专业判断和结果责任不应被虚假的一站式体验抹平" },
  "should-ai-assistants-have-ads": { mechanism: "答案生成、商业排序、用户画像与付费关系之间的隔离", risk: "把自然语言答案的信任迁移给未经标注的赞助内容", metric: "赞助识别率、替代选项曝光、敏感场景的零商业干预率", boundary: "涉及健康、财务、未成年人或脆弱状态时，变现应让位于用户利益" },
  "ai-glasses-as-next-computing-platform": { mechanism: "实时感知、环境理解、提示时机、设备控制与旁观者隐私的协同", risk: "把常驻摄像头带来的数据收集误包装成无摩擦便利", metric: "有效提醒比例、错误打断率、端侧处理占比与旁观者可见提示", boundary: "身体附近的入口必须比手机应用更克制地默认沉默" },
  "ai-act-compliance-as-product-capability": { mechanism: "风险分级、数据治理、人工监督、日志与上市后监控的连续证据", risk: "把合规当成发布前由法务补写的一套文档", metric: "高风险变更的可追溯率、异常发现时间和整改闭环速度", boundary: "制度要求不能替代对实际用户伤害与失败模式的持续观察" },
  "training-data-copyright-license-market": { mechanism: "权利来源、用途范围、训练记录、收益分配与争议处理的可追踪链路", risk: "用一次性授权掩盖后续微调、再分发和跨地域使用的差异", metric: "可验证授权覆盖率、权利人结算准确率和争议处理时延", boundary: "许可市场应扩大创作者选择，而不是把不可谈判的条款制度化" },
  "education-when-every-student-uses-ai": { mechanism: "问题定义、过程记录、证据解释、口头追问与迁移任务的组合评价", risk: "因为难以区分作者就退回到只考记忆或完全禁用工具", metric: "学生能否解释取舍、修正错误并把方法迁移到新问题", boundary: "教育的目标仍是形成判断力，而不是训练人去迎合检测器" },
  "ai-recuts-jobs-before-replacement": { mechanism: "任务拆分、流程重组、责任迁移、技能训练和收益分配之间的联动", risk: "用岗位数量的静态变化掩盖工作质量与议价权的下降", metric: "被替代和被新增任务的比例、培训获得率、收入与负荷变化", boundary: "效率收益不能只由部署方获得，而把过渡风险留给个体承担" },
  "ai-for-science-beyond-reading-papers": { mechanism: "假设生成、实验设计、仪器执行、测量验证和结果复现构成的闭环", risk: "把文献归纳的流畅性误当作可以替代实验的新发现", metric: "可复现实验比例、失败假设的识别速度和每个有效结论的实验成本", boundary: "当证据不足时，系统应提出下一项可检验实验，而不是补写确定性叙述" },
  "the-verification-economy": { mechanism: "来源、生成过程、独立验证、责任承诺与纠错渠道之间的价值链", risk: "将可读的解释或水印直接等同于事实已经被证明", metric: "关键结论的可核验率、纠错时延和责任主体的可定位性", boundary: "验证应服务于可行动的判断，而不是制造另一层昂贵的形式负担" },
  "personalized-persuasion-danger": { mechanism: "个体画像、脆弱时刻识别、内容生成、行为反馈与持续优化的闭环", risk: "把高转化率误读成用户获得了更好的选择", metric: "用户拒绝后系统的降压能力、敏感人群保护与干预可解释性", boundary: "能预测一个人何时动摇，不代表有权在那一刻推他一把" },
  "compute-power-chips-infrastructure-war": { mechanism: "芯片、封装、内存、数据中心、电网、融资与模型需求之间的耦合供给", risk: "只看单一芯片性能而忽略能源、网络和交付周期的短板", metric: "有效算力利用率、每单位可靠输出的能耗和供应中断恢复时间", boundary: "基础设施竞争不应把社区资源、能源外部性和韧性成本排除在账本外" },
  "china-us-ai-ecosystem-routes": { mechanism: "模型供给、算力条件、应用市场、监管环境与开发者工具之间的本地反馈", risk: "用单一榜单把不同市场的约束和真实采用都压成输赢叙事", metric: "可获得能力、开发成本、行业落地速度和用户可选择性", boundary: "比较路线的目的应是理解可互补与可治理之处，而不是固化技术民族主义" },
  "agents-as-identity-bearing-digital-actors": { mechanism: "稳定身份、任务委托、短期凭据、目的限制、撤销与审计之间的授权链", risk: "把一个能登录的机器人误当作可被追责的行动主体", metric: "委托可验证率、越权尝试阻断率、撤销时延和审计完整性", boundary: "身份的价值在于限制和归责，而不是借由拟人化扩大 Agent 的自主范围" },
};

export function closingPasses(slug: string): string[] {
  const focus = batchCFocus[slug];
  if (!focus) return [];

  return [
    `把讨论带回真实场景，最先要拆开的就是${focus.mechanism}。它们在演示里常被一条顺滑的故事线覆盖，落到产品、组织或公共系统中却由不同角色承担成本。先把对象、状态变化和责任交接画清楚，团队才知道究竟该自动化哪一段，又该把哪些判断留给人。`,
    `最容易出现的误判是${focus.risk}。这类错误通常不会在第一次体验时暴露，而会在边缘案例、利益冲突或长期使用后累积成不信任。设计时应主动保留反例和拒绝路径：当证据不足、目标冲突或风险升高，系统能否减速、解释并让用户重新选择。`,
    `判断进展不能只看声量或一次性完成率，更应持续记录${focus.metric}。这些指标把“看上去很聪明”转化为可复盘的经营与治理问题，也能让团队发现效率提升是否只是把成本转移给用户、审核者或未来的维护者。指标一旦能关联具体任务，改进才不会停留在口号。`,
    `最终，${focus.boundary}。成熟方案不是承诺消灭全部摩擦，而是把必要摩擦放在真正需要判断的节点，并让当事人看得见、改得动、退得出。只有能力、激励和责任被放在同一张图上，本文讨论的变化才可能从热闹的功能叙事，变成值得长期依赖的实践。`,
  ];
}
