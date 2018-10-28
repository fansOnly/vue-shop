module.exports = {
    presets: [
        ['@vue/app', {
            polufills: [
                'es6.promise',
                'es6.symbol'
            ]
        }]
    ]
}