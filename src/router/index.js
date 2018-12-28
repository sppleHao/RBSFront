import Vue from 'vue'
import Router from 'vue-router'

import teacherPCLogin from '@/components/teacherPC/login'

import teacherMobileLogin from '@/components/teacherMobile/loginAndActivateAndHome/login'
import teacherMobileFindPassword from '@/components/teacherMobile/accountAndSettings/findPassword'
import teacherMobileProcessingSeminarHome from '@/components/teacherMobile/seminar/processingSeminarHome'
import teacherMobilePauseSeminar from '@/components/teacherMobile/seminar/pauseSeminar'
import teacherMobileProcessingSeminar from '@/components/teacherMobile/seminar/processingSeminar'
import teacherMobileProfile from '@/components/teacherMobile/loginAndActivateAndHome/profile'
import teacherMobileSeminar from '@/components/teacherMobile/seminar/seminar'
import teacherMobileSeminarEnd from '@/components/teacherMobile/seminar/endSeminar'

import StudentMobileAccountIndex from '@/components/studentMobile/accountSettings/StudentMobileAccountIndex'
import StudentMobileAccountSettings from '@/components/studentMobile/accountSettings/StudentMobileAccountSettings'
import StudentMobileCourseIndex from '@/components/studentMobile/course/StudentMobileCourseIndex'
import StudentMobileCourseInfo from '@/components/studentMobile/course/StudentMobileCourseInfo'
import StudentMobileCourseTeamLimit from '@/components/studentMobile/course/StudentMobileCourseTeamLimit'
import StudentMobileCourseScore from '@/components/studentMobile/course/StudentMobileCourseScore'
import StudentMobileCourseTeam from '@/components/studentMobile/course/StudentMobileCourseTeam'
import StudentMobileCourseTeamCreating from '@/components/studentMobile/course/StudentMobileCourseTeamCreating'
import StudentMobileCourseMyTeam from  '@/components/studentMobile/course/StudentMobileCourseMyTeam'
import StudentMobileSeminarCourseSelect from '@/components/studentMobile/seminar/StudentMobileSeminarCourseSelect'
import StudentMobileSeminarSelect from '@/components/studentMobile/seminar/StudentMobileSeminarSelect'
import StudentMobileSeminarIndex from '@/components/studentMobile/seminar/StudentMobileSeminarIndex'
import StudentMobileSeminarPPTDownload from '@/components/studentMobile/seminar/StudentMobileSeminarPPTDownload'
import StudentMobileSeminarPresenting from  '@/components/studentMobile/seminar/StudentMobileSeminarPresenting'
import StudentMobileSeminarSignUp from '@/components/studentMobile/seminar/StudentMobileSeminarSignUp'
import StudentMobileSeminarCancelSignUp from '@/components/studentMobile/seminar/StudentMobileSeminarCancelSignUp'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    //PC端路由
    //教师端
    {
      //登陆
      path: '/MTlogin',
      name: 'teacherMobileLogin',
      component: teacherMobileLogin
    },
    {
      //找回密码
      path: '/accountAndSettings/MTfindPassword',
      name: 'teacherMobileFindPassword',
      component: teacherMobileFindPassword
    },
    {
      //进行中讨论课首页
      path: '/seminar/MTprocessingSeminarHome/:id',
      name: 'teacherMobileProcessingSeminarHome',
      component: teacherMobileProcessingSeminarHome
    },
    {
      //暂停讨论课
      path: '/seminar/MTpauseSeminar',
      name: 'teacherMobilePauseSeminar',
      component: teacherMobilePauseSeminar
    },
    {
      //讨论课进行中
      path: '/seminar/MTprocessingSeminar/:id',
      name: 'teacherMobileProcessingSeminar',
      component: teacherMobileProcessingSeminar
    },
    {
      //个人首页
      path: '/users/MTprofile/:name',
      name: 'teacherMobileProfile',
      component: teacherMobileProfile
    },
    {
      //讨论课首页
      path:'/seminar/MTseminarHome/:id',
      name:'teacherMobileSeminar',
      component:teacherMobileSeminar
    },
    {
      //讨论课结束
      path:'/seminar/MTendSeminar/:id',
      name:'teacherMobileSeminarEnd',
      component:teacherMobileSeminarEnd
    },
    //学生端

    {
      //账户首页
      path:'/studentMobile/account',
      name:'StudentMobileAccountIndex',
      component:StudentMobileAccountIndex,
      alias:'/studentMobile/course',
    },
    {
      //账户设置界面
      path:'/studentMobile/account/settings',
      name:'StudentMobileAccountSettings',
      component:StudentMobileAccountSettings,
      alias:'/studentMobile/course',
    },
    {
      //课程选择界面
      path:'/studentMobile/course/index',
      name:'StudentMobileCourseIndex',
      component:StudentMobileCourseIndex,
      props:true
    },
    {
      //课程信息
      path:'/studentMobile/course/info',
      name:'StudentMobileCourseInfo',
      component:StudentMobileCourseInfo,
      props:true
    },
    {
      //课程组队信息
      path:'/studentMobile/course/info/limit',
      name:'StudentMobileCourseTeamLimit',
      component:StudentMobileCourseTeamLimit,
      props:true
    },
    {
      //课程成绩
      path:'/studentMobile/course/score',
      name:'StudentMobileCourseScore',
      component:StudentMobileCourseScore,
      props:true
    },
    {
      //课程组队
      path:'/studentMobile/course/team',
      name:'StudentMobileCourseTeam',
      component:StudentMobileCourseTeam,
      props:true
    },
    {
      //创建队伍
      path:'/studentMobile/course/team/create',
      name:'StudentMobileCourseTeamCreating',
      component:StudentMobileCourseTeamCreating,
      props:true
    },
    {
      //创建队伍
      path:'/studentMobile/course/team/myTeam',
      name:'StudentMobileCourseMyTeam',
      component:StudentMobileCourseMyTeam,
      props:true
    },
    {
      //讨论课课程选择界面
      path:'/studentMobile/seminar/index',
      name:'StudentMobileSeminarCourseSelect',
      component:StudentMobileSeminarCourseSelect,
      props:true
    },
    {
      //讨论课选择界面
      path:'/studentMobile/seminar/select',
      name:'StudentMobileSeminarSelect',
      component:StudentMobileSeminarSelect,
      props:true
    },
    {
      //讨论课首页
      path:'/studentMobile/seminar/info/index',
      name:'StudentMobileSeminarIndex',
      component:StudentMobileSeminarIndex,
      props:true
    },
    {
      //讨论课ppt下载
      path:'/studentMobile/seminar/info/ppt',
      name:'StudentMobileSeminarPPTDownload',
      component:StudentMobileSeminarPPTDownload,
      props:true
    },
    {
      //讨论课展示流程(提问)
      path:'/studentMobile/seminar/info/presenting',
      name:'StudentMobileSeminarPresenting',
      component:StudentMobileSeminarPresenting,
      props:true
    },
    {
      //讨论课报名
      path:'/studentMobile/seminar/info/signUp',
      name:'StudentMobileSeminarSignUp',
      component:StudentMobileSeminarSignUp,
      props:true
    },
    {
      //讨论课取消报名
      path:'/studentMobile/seminar/info/cancelSignUp',
      name:'StudentMobileSeminarCancelSignUp',
      component:StudentMobileSeminarCancelSignUp,
      props:true
    },

    //PC端路由
    //教师端
    {
      path:'/PCTlogin',
      name:'teacherPCLogin',
      component:teacherPCLogin
    },
    //学生端

  ]
})
