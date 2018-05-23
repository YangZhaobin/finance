var decode = decodeURIComponent;
var encode = encodeURIComponent;

// Helpers
function isString(o) {
    return typeof o === 'string';
}

function isNonEmptyString(s) {
    return isString(s) && s !== '';
}

function validateCookieName(name) {
    if (!isNonEmptyString(name)) {
        throw new TypeError('Cookie name must be a non-empty string');
    }
}

function same(s) {
    return s;
}

function parseCookieString(text, shouldDecode) {
    var cookies = {};

    if (isString(text) && text.length > 0) {
        var decodeValue = shouldDecode ? decode : same;
        var cookieParts = text.split(/;\s/g);
        var cookieName;
        var cookieValue;
        var cookieNameValue;

        for (var i = 0, len = cookieParts.length; i < len; i++) {
            // Check for normally-formatted cookie (name-value)
            cookieNameValue = cookieParts[i].match(/([^=]+)=/i);
            if (cookieNameValue instanceof Array) {
                try {
                    cookieName = decode(cookieNameValue[1]);
                    cookieValue = decodeValue(cookieParts[i]
                        .substring(cookieNameValue[1].length + 1));
                } catch (ex) {
                    // Intentionally ignore the cookie -
                    // the encoding is wrong
                }
            } else {
                // Means the cookie does not have an "=", so treat it as
                // a boolean flag
                cookieName = decode(cookieParts[i]);
                cookieValue = '';
            }

            if (cookieName) {
                cookies[cookieName] = cookieValue;
            }
        }
    }
    return cookies;
}

export const Cookie = {
    /**
     * 返回指定name的cookie
     * @param {String} name 要检索cookie的名称
     * @param {Function|Object} [options] 一个对象包含一个或多个cookie选项；
     *     1.当options是函数时，转换函数返回值。
     *     2.当options是对象，raw被设置为true时,cookie值不是URI解码。
     * @returns {*}
     */
    get(name, options) {
        validateCookieName(name);

        if (typeof options === 'function') {
            options = {converter: options};
        } else {
            options = options || {};
        }

        var cookies = parseCookieString(document.cookie, !options['raw']);
        return (options.converter || same)(cookies[name]);
    },
    /**
     * 根据给定的名称和值设置一个cookie
     * @param {string} name cookie的名称
     * @param {*} value 设置cookie的值
     * @param {Object} [options] 包含cookie选项的对象：
     *     path (a string) 默认根目录
     *     domain (a string) 默认当前域名的domain
     *     expires (number or a Date object) 默认30天
     *     secure (true/false) 当属性设置为true时，cookie只有在https协议下才能上传到服务器。
     *     raw (true/false). 如果设置为true,cookie不应该在设置之前URI编码。
     * @returns {string} 创建的cookie字符串
     */
    set(name, value, options) {
        validateCookieName(name);

        options = options || {};
        var expires = options['expires'];
        if (typeof expires === 'undefined') {
            // 默认30天有效期
            expires = 30;
        }
        var domain = options['domain'] || document.domain;
        var path = options['path'] || '/';

        if (!options['raw']) {
            value = encode(String(value));
        }

        var text = name + '=' + value;

        // expires
        var date = expires;
        if (typeof date === 'number') {
            date = new Date();
            date.setDate(date.getDate() + expires);
        }
        if (date instanceof Date) {
            text += '; expires=' + date.toUTCString();
        }

        // domain
        if (isNonEmptyString(domain)) {
            text += '; domain=' + domain;
        }

        // path
        if (isNonEmptyString(path)) {
            text += '; path=' + path;
        }

        // secure
        if (options['secure']) {
            text += '; secure';
        }

        document.cookie = text;
        return text;
    },
    /**
     * 通过将cookie有效期设置成一个过去的时间来移除cookie
     * @param {string} name 将要移除的cookie名
     * @param options cookie配置项，参考set方法
     * @returns {string} 创建的cookie字符串
     */
    remove(name, options) {
        options = options || {};
        options['expires'] = new Date(0);
        return this.set(name, '', options);
    }
};