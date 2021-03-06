const Fuse = require('fuse-bindings')
const debug = require('debug')('safe-fuse:ops')

module.exports = (safeVfs) => {
  return {
    rename (itemPath, newPath, reply) {
      try {
        debug('rename(\'%s\', \'%s\')', itemPath, newPath)

        safeVfs.getHandler(itemPath).rename(itemPath, newPath).then((result) => {
          debug('Renamed: %s, to: %s', itemPath, newPath)
          if (result) reply(0)
          reply(Fuse.EOPNOTSUPP) // Don't allow rename of directories etc
        }).catch((e) => { throw e })
      } catch (err) {
        debug('Failed to rename: %s, to: %s', itemPath, newPath)
        debug(err)
        reply(Fuse.EREMOTEIO)
      }
    }
  }
}
