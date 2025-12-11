
import { ContentText } from './types';

export const TEXT_CONTENT: Record<'cn' | 'en', ContentText> = {
  cn: {
    nav: {
      home: '首页',
      about: '关于同威',
      business: '业务领域',
      marketInsights: '市场洞察',
      contact: '联系我们',
      login: '登录',
      register: '注册',
      logout: '退出',
    },
    hero: {
      title: '智慧投资，共创未来',
      subtitle: '深圳市同威投资管理有限公司，您的专业资产管理合作伙伴',
      cta: '了解更多',
    },
    about: {
      title: '关于同威',
      description: '深圳市同威投资管理有限公司成立于2013年3月25日，是一家注册于深圳前海深港合作区的专业投资机构。我们致力于为高净值客户和企业提供受托资产管理、股权投资及投资咨询服务。公司秉承稳健、专业的经营理念，在资本市场中寻找长期的价值增长点。',
      imageSubtitle: '深圳市同威投资管理有限公司',
      detailsTitle: '工商信息',
      estDate: '成立日期：2013年03月25日',
      capital: '注册资本：500万元人民币',
      rep: '法定代表人：李黄光',
      location: '地址：深圳市前海深港合作区前湾一路1号A栋201室',
      philosophy: {
        title: '经营理念',
        items: [
          {
            title: '专业',
            desc: '专注的研究和纪律严明的投资策略。'
          },
          {
            title: '诚信',
            desc: '在所有客户往来中保持透明和诚实。'
          },
          {
            title: '成长',
            desc: '为我们的合作伙伴创造可持续的长期价值。'
          }
        ]
      }
    },
    business: {
      title: '业务领域',
      subtitle: '专为增长量身定制的专业资产管理和投资服务。',
      detailsButton: '详情',
      items: [
        {
          title: '受托资产管理',
          desc: '依托专业的投研团队，为客户提供定制化的资产配置方案，实现财富稳健增值。',
        },
        {
          title: '股权投资',
          desc: '聚焦高成长性企业，通过直接股权投资助力实体经济发展，分享企业成长红利。',
        },
        {
          title: '投资咨询',
          desc: '为企业及个人提供专业的市场分析、财务顾问及战略规划咨询服务。',
        },
        {
          title: '受托管理股权投资基金',
          desc: '规范化管理各类股权投资基金，严格风控，确保基金运作合规高效。',
        },
      ],
    },
    marketInsights: {
      title: '市场洞察',
      subtitle: '深度解读全球经济趋势，发掘前沿投资机会',
      readMore: '阅读分析',
      viewArchives: '查看所有归档',
      categories: {
        all: '全部',
        macro: '宏观经济',
        industry: '行业趋势',
        strategy: '投资策略',
      },
      articles: [
        {
          id: 1,
          title: '2024年下半年全球宏观经济展望',
          date: '2024-06-15',
          category: 'macro',
          image: 'https://picsum.photos/seed/macro/800/600',
          summary: '随着通胀压力的缓解和央行政策的转向，全球经济正在进入一个新的周期。本文深入分析了主要经济体的增长前景及潜在风险。',
        },
        {
          id: 2,
          title: '人工智能：重塑金融服务业的未来',
          date: '2024-06-10',
          category: 'industry',
          image: 'https://picsum.photos/seed/ai/800/600',
          summary: '从算法交易到智能投顾，AI技术正在彻底改变金融行业的运作模式。我们需要关注哪些核心变革和投资标的？',
        },
        {
          id: 3,
          title: '新能源产业链的价值重估',
          date: '2024-05-28',
          category: 'industry',
          image: 'https://picsum.photos/seed/energy/800/600',
          summary: '在碳中和背景下，光伏、风电及储能技术快速迭代。如何从产业链上下游中寻找具备长期护城河的优质企业？',
        },
        {
          id: 4,
          title: '波动市场中的资产配置策略',
          date: '2024-05-15',
          category: 'strategy',
          image: 'https://picsum.photos/seed/strategy/800/600',
          summary: '面对地缘政治的不确定性，构建多元化的投资组合至关重要。本文探讨了如何在防御与进攻之间取得平衡。',
        },
        {
          id: 5,
          title: '生物医药行业的创新与机遇',
          date: '2024-05-02',
          category: 'industry',
          image: 'https://picsum.photos/seed/bio/800/600',
          summary: '随着人口老龄化加剧，生物医药需求持续增长。创新药和医疗器械领域的最新突破带来了哪些投资启示？',
        },
        {
          id: 6,
          title: '利率周期转向下的债券市场分析',
          date: '2024-04-20',
          category: 'macro',
          image: 'https://picsum.photos/seed/bonds/800/600',
          summary: '美联储加息周期接近尾声，债券市场的配置价值逐渐显现。如何把握收益率曲线变化带来的交易机会？',
        },
      ],
    },
    contact: {
      title: '联系我们',
      subtitle: '对我们的基金感兴趣？我们的投资者关系团队将为您解答疑问并提供详细的业绩数据。',
      addressTitle: '总部地址',
      address: '深圳市前海深港合作区前湾一路1号A栋201室',
      phoneTitle: '电话',
      phone: '0755-88888888',
      emailTitle: '电子邮箱',
      email: 'invest@tongwei-invest.com',
      email2: 'media@tongwei-invest.com',
      form: {
        title: '发送咨询',
        name: '姓名',
        email: '电子邮箱',
        type: '投资者类型',
        typeOptions: {
          institutional: '机构投资者',
          individual: '个人投资者',
          media: '媒体/其他',
        },
        message: '留言内容',
        submit: '提交咨询',
      },
    },
    inquiries: [
      {
        id: 1,
        name: '张经理',
        email: 'manager.zhang@example.com',
        type: '机构投资者',
        message: '我对贵公司的受托资产管理服务感兴趣，希望能获取更多资料。',
        date: '2024-06-20',
        status: 'unread'
      },
      {
        id: 2,
        name: 'Alice Smith',
        email: 'alice@example.com',
        type: 'Media/Other',
        message: 'We would like to interview your CEO regarding the new fund launch.',
        date: '2024-06-18',
        status: 'read'
      }
    ],
    auth: {
      loginTitle: '投资者账户登录',
      registerTitle: '创建投资账户',
      emailPlaceholder: '账户ID / 邮箱',
      passwordPlaceholder: '密码',
      confirmPasswordPlaceholder: '确认密码',
      namePlaceholder: '姓名',
      submitLogin: '安全登录',
      submitRegister: '立即注册',
      hasAccount: '已有账户？立即登录',
      noAccount: '还没有账户？立即注册',
      welcomeBack: '欢迎回来。请使用您的安全凭证访问账户。',
      welcomeNew: '请输入您的信息以创建新的投资者账户。',
      rememberMe: '记住我',
      forgotPassword: '忘记密码?',
      sslSecure: '您的数据传输已通过256位SSL加密保护。'
    },
    cookieConsent: {
      text: '本网站使用 Cookie 以提供更好的浏览体验、分析网站流量并为您个性化内容。继续浏览即表示您同意我们使用 Cookie。',
      accept: '接受所有',
      decline: '拒绝',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      business: 'Business',
      marketInsights: 'Market Insights',
      contact: 'Contact',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
    },
    hero: {
      title: 'Smart Investment, Shared Future',
      subtitle: 'Shenzhen Tongwei Investment Management Co., Ltd. - Your Trusted Asset Management Partner',
      cta: 'Learn More',
    },
    about: {
      title: 'About Tongwei',
      description: 'Shenzhen Tongwei Investment Management Co., Ltd. was established on March 25, 2013, and is a professional investment institution registered in the Shenzhen Qianhai Shenzhen-Hong Kong Cooperation Zone. We are committed to providing entrusted asset management, equity investment, and investment consulting services to high-net-worth individuals and enterprises.',
      imageSubtitle: 'Shenzhen Tongwei Investment',
      detailsTitle: 'Company Details',
      estDate: 'Est. Date: March 25, 2013',
      capital: 'Registered Capital: 5 Million RMB',
      rep: 'Legal Representative: Li Huangguang',
      location: 'Add: Room 201, Bldg A, No.1 Qianwan 1st Rd, Qianhai, Shenzhen',
      philosophy: {
        title: 'Management Philosophy',
        items: [
          {
            title: 'Professionalism',
            desc: 'Dedicated research and disciplined investment strategies.'
          },
          {
            title: 'Integrity',
            desc: 'Transparency and honesty in all our client dealings.'
          },
          {
            title: 'Growth',
            desc: 'Sustainable long-term value creation for our partners.'
          }
        ]
      }
    },
    business: {
      title: 'Our Business',
      subtitle: 'Professional asset management and investment services tailored for growth.',
      detailsButton: 'DETAILS',
      items: [
        {
          title: 'Asset Management',
          desc: 'Relying on a professional research team to provide customized asset allocation solutions.',
        },
        {
          title: 'Equity Investment',
          desc: 'Focusing on high-growth enterprises and supporting the real economy through direct equity investment.',
        },
        {
          title: 'Investment Consulting',
          desc: 'Providing professional market analysis, financial advisory, and strategic planning services.',
        },
        {
          title: 'Fund Management',
          desc: 'Standardized management of various equity investment funds with strict risk control.',
        },
      ],
    },
    marketInsights: {
      title: 'Market Insights',
      subtitle: 'In-depth analysis of global economic trends and investment opportunities',
      readMore: 'Read Analysis',
      viewArchives: 'View All Archives',
      categories: {
        all: 'All',
        macro: 'Macro Economy',
        industry: 'Industry Trends',
        strategy: 'Investment Strategy',
      },
      articles: [
        {
          id: 1,
          title: 'Global Macroeconomic Outlook H2 2024',
          date: '2024-06-15',
          category: 'macro',
          image: 'https://picsum.photos/seed/macro/800/600',
          summary: 'As inflation pressures ease and central bank policies shift, the global economy is entering a new cycle. This article analyzes growth prospects and risks.',
        },
        {
          id: 2,
          title: 'AI: Reshaping the Future of Financial Services',
          date: '2024-06-10',
          category: 'industry',
          image: 'https://picsum.photos/seed/ai/800/600',
          summary: 'From algorithmic trading to robo-advisors, AI is revolutionizing finance. What are the core transformations and key investment targets to watch?',
        },
        {
          id: 3,
          title: 'Revaluation of the New Energy Supply Chain',
          date: '2024-05-28',
          category: 'industry',
          image: 'https://picsum.photos/seed/energy/800/600',
          summary: 'With rapid iterations in PV, wind, and storage tech under carbon neutrality goals, how can we find companies with long-term moats?',
        },
        {
          id: 4,
          title: 'Asset Allocation Strategies in Volatile Markets',
          date: '2024-05-15',
          category: 'strategy',
          image: 'https://picsum.photos/seed/strategy/800/600',
          summary: 'Facing geopolitical uncertainties, building a diversified portfolio is crucial. We explore balancing defense and offense in investment.',
        },
        {
          id: 5,
          title: 'Innovation and Opportunity in Bio-Pharma',
          date: '2024-05-02',
          category: 'industry',
          image: 'https://picsum.photos/seed/bio/800/600',
          summary: 'As populations age, demand for healthcare grows. What investment insights do recent breakthroughs in innovative drugs offer?',
        },
        {
          id: 6,
          title: 'Bond Market Analysis Amidst Rate Cycle Shifts',
          date: '2024-04-20',
          category: 'macro',
          image: 'https://picsum.photos/seed/bonds/800/600',
          summary: 'As the Fed rate hike cycle nears its end, the value of bonds is emerging. How to seize opportunities from yield curve changes?',
        },
      ],
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Interested in our funds? Our Investor Relations team is ready to answer your questions.',
      addressTitle: 'Headquarters',
      address: 'Room 201, Bldg A, No.1 Qianwan 1st Rd, Qianhai, Shenzhen',
      phoneTitle: 'Phone',
      phone: '+86 755 8888 8888',
      emailTitle: 'Email',
      email: 'invest@tongwei-invest.com',
      email2: 'media@tongwei-invest.com',
      form: {
        title: 'Send Inquiry',
        name: 'Name',
        email: 'Email',
        type: 'Investor Type',
        typeOptions: {
          institutional: 'Institutional Investor',
          individual: 'Individual Investor',
          media: 'Media/Other',
        },
        message: 'Message',
        submit: 'Submit Inquiry',
      },
    },
    inquiries: [
      {
        id: 1,
        name: '张经理',
        email: 'manager.zhang@example.com',
        type: '机构投资者',
        message: '我对贵公司的受托资产管理服务感兴趣，希望能获取更多资料。',
        date: '2024-06-20',
        status: 'unread'
      },
      {
        id: 2,
        name: 'Alice Smith',
        email: 'alice@example.com',
        type: 'Media/Other',
        message: 'We would like to interview your CEO regarding the new fund launch.',
        date: '2024-06-18',
        status: 'read'
      }
    ],
    auth: {
      loginTitle: 'Investor Portal Login',
      registerTitle: 'Create Account',
      emailPlaceholder: 'ID / Email',
      passwordPlaceholder: 'Password',
      confirmPasswordPlaceholder: 'Confirm Password',
      namePlaceholder: 'Full Name',
      submitLogin: 'Secure Login',
      submitRegister: 'Register Now',
      hasAccount: 'Have an account? Login',
      noAccount: 'No account? Register',
      welcomeBack: 'Welcome back. Please use your security credentials to access account.',
      welcomeNew: 'Please enter your details to create a new investor account.',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot Password?',
      sslSecure: 'Your data transmission is protected by 256-bit SSL encryption.'
    },
    cookieConsent: {
      text: 'We use cookies to improve your experience, analyze site traffic, and personalize content. By continuing to browse, you agree to our use of cookies.',
      accept: 'Accept All',
      decline: 'Decline',
    },
  },
};
