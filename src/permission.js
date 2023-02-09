/**
 * 权限处理
 */
export default {
  inserted(el, binding, vnode) {
    const { value } = binding;
    localStorage.setItem('userPermissions', 'home:advertising:save,home:advertising:update')
    const permissions = localStorage.getItem('userPermissions')&& localStorage.getItem('userPermissions').split(',');
    // 判断传入的组件权限是否符合要求
    if (value && value instanceof Array && value.length > 0) {
      const permissionFlag = value;
      const hasPermissions = permissions && permissions.some(permission => 'all_permission' === permission || permissionFlag.includes(permission));
      // 判断是否有权限是否要展示
      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`请设置操作权限标签值`);
    }
  },
};
