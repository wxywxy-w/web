// import Main from '@/components/main'
// import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */


// mode:'history'
export default
[
		//登录
	{
		path: '/login',
		name: 'login',
		meta: {
			title: 'Login - 登录',
			hideInMenu: true
		},
		component: () => import('@/views/login/Login.vue')
	},
		//提现
	{
		path: '/4_2',
		name: 'tixian',
		meta: {
			icon: 'md-arrow-dropdown-circle',
			requireAuth: true
		},
		component: () => import('@/views/tixian/App_index.vue'),
		children:[
			{
			path:'/index',
			name:'about',
			component: ()=>import('@/views/tixian/Home.vue')
			},
			{
				path:'/about',
				name:'about',
				component: ()=>import('@/views/tixian/About.vue')
			},
			{
				path:'/revie',
				name:'about',
				component: ()=>import('@/views/tixian/revie.vue')
			}
		]
	},

	//主页面
	{
		path: '/',
		name: '_home',
		redirect: '/home',
		component: () => import('@/Apphome.vue'),
		meta: {
			hideInMenu: true,
			notCache: true,
			requireAuth: true
		},
		children: [
			{
				path: '/home',
				name: 'home',
				meta: {
					hideInMenu: true,
					title: '首页',
					notCache: true,
					icon: 'md-home',
					requireAuth: true

				},
				component: () => import('@/views/toContent')
			},
			{
				path: '/info',
				name: 'essentialinformation',
				meta: {
					icon: 'md-arrow-dropdown-circle',
					requireAuth: true

				},
				component: () => import('@/views/essentialinformation')

			},
			{
				path: '/1_1_1',
				name: 'contenteditor',
				meta: {
					icon: 'md-arrow-dropdown-circle',
					requireAuth: true

				},
				component: () => import('@/views/contenteditor')

			},
			{
				path: '/refresh',
				component: () => import('@/views/refresh')
			},
			{
				path: '/1_2',
				name: 'addContent',
				meta: {
					hideInMenu: true,
					title: '首页2',
					notCache: true,
					icon: 'md-arrow-dropdown-circle',
					requireAuth: true
				},
				component: () => import('@/views/addContent'),
			},
			{
				path: '/1_3',
				name: 'adverList',
				meta: {
					icon: 'md-arrow-dropdown-circle',
					requireAuth: true
				},
				component: () => import('@/views/adverList')
			},
			{
				path: '/2_1',
				name: 'orderList',
				meta: {
					icon: 'md-arrow-dropdown-circle',
					requireAuth: true

				},
				component: () => import('@/views/orderList')
			},
			{
				path: '/2_1_1',
				name: 'orderdetails',
				meta: {
					icon: 'md-arrow-dropdown-circle',
					requireAuth: true

				},
				component: () => import('@/views/orderdetails'),

			},
			{
				path: '/2_1_2',
				name: 'viewLogistics',
				meta: {
					icon: 'md-arrow-dropdown-circle',
					requireAuth: true

				},
				component: () => import('@/views/viewLogistics'),

			},
			{
				path: '/2_2',
				name: 'promotionContents',
				meta: {
					icon: 'md-arrow-dropdown-circle',
					requireAuth: true

				},
				component: () => import('@/views/promotionContents')
			},
			{
				path: '/2_3',
				name: 'exchangeList',
				meta: {
					requireAuth: true
				},
				component: () => import('@/views/exchangeList'),
			},
			{
				path: '/3_1',
				name: 'ListofGoods',
				meta: {
					icon: 'md-arrow-dropdown-circle',
					requireAuth: true

				},
				component: () => import('@/views/ListofGoods')
			},
			{
				path: '/3_1_1',
				name: 'comeditor',
				meta: {
					icon: 'md-arrow-dropdown-circle',
					requireAuth: true
				},
				component: () => import('@/views/comeditor'),

			},
			{
				path: '/3_1_2',
				name: 'comModification',
				meta: {
					icon: 'md-arrow-dropdown-circle',
					requireAuth: true

				},
				component: () => import('@/views/comModification'),

			},
			{
				path: '/3_1_3',
				name: 'unifiedediting',
				meta: {
					icon: 'md-arrow-dropdown-circle',
					requireAuth: true

				},
				component: () => import('@/views/unifiedediting'),

			},
			{
				path: '/3_1_4',
				name: 'unifiededitor',
				meta: {
					icon: 'md-arrow-dropdown-circle',
					requireAuth: true
				},
				component: () => import('@/views/unifiededitor'),

			},
			{
				path: '/3_2',
				name: 'addgoods',
				meta: {
					icon: 'md-arrow-dropdown-circle',
					requireAuth: true
				},
				component: () => import('@/views/addgoods')
			},
			{
				path: '/4_1',
				name: 'cashaudit',
				meta: {
					icon: 'md-arrow-dropdown-circle',
					requireAuth: true
				},
				component: () => import('@/views/cashaudit')
			},
			{
				path: '/5_1',
				name: 'PrivilegManagAccount',
				meta: {
					icon: 'md-arrow-dropdown-circle',
					requireAuth: true
				},
				component: () => import('@/views/PrivilegManagAccount')
			},

			{
				path: '/6_1',
				name: 'platemanage',
				meta: {
					icon: 'md-arrow-dropdown-circle',
					requireAuth: true
				},
				component: () => import('@/views/platemanage')
			},
			{
				path: '/6_2',
				name: 'classifiedmanage',
				meta: {
					icon: 'md-arrow-dropdown-circle',
					requireAuth: true
				},
				component: () => import('@/views/classifiedmanage')
			},
			{
				path: '/7_1',
				name: 'zeroPurchase',
				meta: {
					icon: 'md-arrow-dropdown-circle',
					requireAuth: true
				},
				component: () => import('@/views/zeroPurchase')
			},
			{
				path: '/7_2',
				name: 'purchaseList',
				meta: {
					icon: 'md-arrow-dropdown-circle',
					requireAuth: true
				},
				component: () => import('@/views/purchaseList')
			},
			{
				path: '/8_1',
				name: 'robotUsrt',
				meta: {
					icon: 'md-arrow-dropdown-circle',
					requireAuth: true
				},
				component: () => import('@/views/Robot/userList')
			},
			{
				path: '/8_2',
				name: 'auditStatus',
				meta: {
					icon: 'md-arrow-dropdown-circle',
					requireAuth: true
				},
				component: () => import('@/views/Robot/auditStatus')
			}
		]
	},
	{
		path:'/404',
		name:'error_404',
		component:()=>import('@/views/error/error_404.vue'),
		meta: {
			icon: 'md-arrow-dropdown-circle',
			requireAuth: false,
			title:'页面弄丢了'
		},
	},
	{
		path:'/500',
		name:'error_500',
		component:()=>import('@/views/error/error_500.vue'),
		meta: {
			icon: 'md-arrow-dropdown-circle',
			requireAuth: false,
			title:'服务器错误'
		},
	},


]
