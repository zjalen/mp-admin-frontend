const routes = [
    { path: '/', component: () => import('@/layouts/LayoutWithoutMenu'), children:
        [
            { name: 'mp-list', path: '', component: () => import('../views/MpList') },
            { name: 'mp-create', path: 'create', component: () => import('../views/MpCreateAndEdit') },
        ]
    },
    { path: '/mp/:mp_sign', component: () => import('@/layouts/Layout'), children:
        [
            { name: 'home', path: 'home', component: () => import('../views/Home') },
            { name: 'custom-menu', path: 'custom-menu/:menu_id?', component: () => import('@/views/CustomMenu') },
            { name: 'menus', path: 'menus', component: () => import('@/views/Menus') },
            { name: 'user-messages', path: 'user-message', component: () => import('@/views/UserMessages') },
            { name: 'auto-reply', path: 'auto-reply', component: () => import('@/views/AutoReply') },
            { name: 'auto-reply-create', path: 'auto-reply-create', component: () => import('@/views/AutoReplyCreateAndEdit') },
            { name: 'auto-reply-edit', path: 'auto-reply-edit/:auto_reply_id', component: () => import('@/views/AutoReplyCreateAndEdit') },
            { name: 'mp-edit', path: 'mp-edit', component: () => import('@/views/MpCreateAndEdit') },
            { name: 'messages', path: 'messages', component: () => import('@/views/Messages') },
            { name: 'message-create', path: 'message-create', component: () => import('@/views/MessageCreateAndEdit') },
            { name: 'message-edit', path: 'message-edit/:message_id', component: () => import('@/views/MessageCreateAndEdit') },
        ]
    },
];

export default routes;
