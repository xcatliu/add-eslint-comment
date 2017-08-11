const fs = require('fs');

class AddESLintComment {
  byESLintResultJSON(eslintResultJSON) {
    const fileNameAndErrorRuleIdJSON = this.transformESLintResultJSONToFileNameAndErrorRuleIdJSON(eslintResultJSON);
    this.prependESLintCommentPreFile(fileNameAndErrorRuleIdJSON);

    console.log('Completed');
  }

  transformESLintResultJSONToFileNameAndErrorRuleIdJSON(eslintResultJSON) {
    const result = [];
    eslintResultJSON.forEach((oneResult) => {
      if (oneResult.errorCount === 0) {
        return;
      }
      const filePath = oneResult.filePath;
      const errorRuleIds = [];
      oneResult.messages.forEach((oneMessage) => {
        if (oneMessage.severity !== 2) {
          return;
        }
        if (errorRuleIds.indexOf(oneMessage.ruleId) === -1) {
          errorRuleIds.push(oneMessage.ruleId);
        }
      });
      result.push({
        filePath,
        errorRuleIds
      });
    });
    return result;
  }

  prependESLintCommentPreFile(fileNameAndErrorRuleIdJSON) {
    fileNameAndErrorRuleIdJSON.forEach((oneResult) => {
      const fileContent = fs.readFileSync(oneResult.filePath);
      const newFileContent = oneResult.errorRuleIds.map((errorRuleId) => {
        return `/* eslint ${errorRuleId}:0 */\r\n`;
      }).join('') + fileContent;
      fs.writeFileSync(oneResult.filePath, newFileContent);
      console.log(`Add eslint comment ${oneResult.errorRuleIds.join(',')} to file ${oneResult.filePath}`);
    });
  }
}

module.exports = AddESLintComment;
