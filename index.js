module.exports = function blacklist(patterns = []) {
  return {
    name: "blacklist",
    resolveId(source, importer) {
      for (const pattern of patterns) {
        if (pattern.test(source)) {
          this.error(`Blacklisted module "${source}" found in ${importer}`);
        }
      }
      return null;
    }
  };
}
