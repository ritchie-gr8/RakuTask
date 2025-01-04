// error handler middleware
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }

    const statusCode =
        res.statusCode && res.statusCode >= 400 ?
            res.statusCode : 500

    res.status(statusCode)

    const isDevMode = process.env.NODE_ENV !== 'production'
    if (isDevMode) {
        console.error(err)
    }

    res.json({
        message: err.message,
        stack: isDevMode ? err.stack : null
    })
}

export default errorHandler