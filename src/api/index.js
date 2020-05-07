import qs from 'qs';
import request from '../utils/request'

/**
 * 获取公众号列表
 */
export function getMpList(params) {
  return request({
    url: '/mp-info?' + qs.stringify(params),
    method: 'get',
  })
}

/**
 * 获取公众号信息
 */
export function getMpInfo(sign) {
  return request({
    url: '/mp-info/' + sign,
    method: 'get',
  })
}

/**
 * 添加公众号
 */
export function createMpInfo(params) {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data;charset=UTF-8'
        }
    }
  return request({
    url: '/mp-info',
    method: 'post',
    data: params,
    config
  })
}

/**
 * 修改公众号
 */
export function updateMpInfo(sign, params) {
  const config = {
        headers: {
            'Content-Type': 'multipart/form-data;charset=UTF-8'
        }
  }
  return request({
    url: '/mp-info/' + sign,
    method: 'post',
    data: params,
    config
  })
}

/**
 * 删除公众号
 */
export function deleteMpInfo(sign) {
  return request({
    url: '/mp-info/' + sign,
    method: 'delete',
  })
}

/**
 * 获取菜单信息
 */
export function getMenus(params) {
  return request({
    url: '/menus?' + qs.stringify(params),
    method: 'get',
  })
}

/**
 * 获取菜单信息
 */
export function getMenu(id) {
  return request({
    url: '/menus/' + id,
    method: 'get',
  })
}

/**
 * 获取当前正在使用的菜单信息
 */
export function getCurrentMpMenu() {
  return request({
    url: '/menus/current',
    method: 'get',
  })
}

/**
 * 更新菜单到微信
 */
export function updateMenuToMp(params) {
  return request({
    url: '/menusToMp',
    method: 'post',
    params
  })
}


/**
 * 存储菜单到数据库
 */
export function createMenu(params) {
  return request({
    url: '/menus',
    method: 'post',
    params
  })
}

/**
 * 更新菜单到数据库
 */
export function updateMenu(id, params) {
  return request({
    url: '/menus/' + id,
    method: 'put',
    params
  })
}

/**
 * 删除菜单
 */
export function deleteMenu(id) {
  return request({
    url: '/menus/' + id,
    method: 'delete',
  })
}


/**
 * 获取消息列表
 */
export function getMessages(params) {
  return request({
    url: '/messages?' + qs.stringify(params),
    method: 'get',
  })
}

/**
 * 获取单条消息
 */
export function getMessage(id) {
  return request({
    url: '/messages/' + id,
    method: 'get',
  })
}

/**
 * 添加消息
 */
export function createMessage(params) {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data;charset=UTF-8'
        }
  }
  return request({
    url: '/messages',
    method: 'post',
    data:params,
    config
  })
}

/**
 * 删除自定义消息
 */
export function deleteMessage(id) {
  return request({
    url: '/messages/' + id,
    method: 'delete',
  })
}

/**
 * 更新消息
 */
export function updateMessage(id, params) {
  const config = {
        headers: {
            'Content-Type': 'text/json;charset=UTF-8'
        }
  }
  return request({
    url: '/messages/' + id,
    method: 'put',
    data: params,
    config
  })
}


/**
 * 获取单条消息
 */
export function getUserMessage(id) {
  return request({
    url: '/user-messages/' + id,
    method: 'get',
  })
}

/**
 * 获取消息列表
 */
export function getUserMessages(params) {
  return request({
    url: '/user-messages?' + qs.stringify(params),
    method: 'get',
  })
}


/**
 * 获取自动回复配置
 */
export function getAutoReplyConfigs(params) {
  return request({
    url: '/auto-reply-configs?' + qs.stringify(params),
    method: 'get',
  })
}

/**
 * 获取单个自动回复配置
 */
export function getAutoReplyConfig(id) {
  return request({
    url: '/auto-reply-configs/' + id,
    method: 'get',
  })
}

/**
 * 添加配置信息
 */
export function createAutoReplyConfig(params) {
  return request({
    url: '/auto-reply-configs',
    method: 'post',
    params
  })
}

/**
 * 更新配置信息
 */
export function updateAutoReplyConfig(id, params) {
  return request({
    url: '/auto-reply-configs/' + id,
    method: 'put',
    params
  })
}

/**
 * 删除配置信息
 */
export function deleteAutoReplyConfig(id) {
  return request({
    url: '/auto-reply-configs/' + id,
    method: 'delete',
  })
}

