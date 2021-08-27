class AssertionFailure extends Error {}

export class TestSuite {
  constructor(caseFiles, {logger = console} = {}) {
    this.logger = logger;
    this.caseFiles = caseFiles;
  }

  async runAll() {
    this.logger.log("Starting tests...");
    for (let caseFile of this.caseFiles) {
      await this.runCase(caseFile);
    }
  }

  async runCase(caseFile) {
    this.logger.log(`Importing ${caseFile}...`);

    let testCaseClass = await import(caseFile);
    testCaseClass = testCaseClass.default;

    this.logger.log(`Starting ${testCaseClass.name}...`);

    let testCase = new testCaseClass({logger: this.logger});
    await testCase.run()
  }

}

export class TestCase {
  constructor({logger = console} = {}) {
    this.logger = logger;
  }

  get allTests() {
    return Reflect.ownKeys(Reflect.getPrototypeOf(this))
      .filter(t => (t.startsWith('test') && (typeof this[t] === 'function')));
  }

  async run() {
    let tests = this.allTests;
    this.log(`${tests.length} tests.`);
    for(let test of tests) {
      this.log(`  ${test}`);

      try {
        await this[test]();
        this.log(`    Success`);
      } catch (err) {
        this.log(`    Test failed: ${err}`);
      }
    }
  }

  assert(condition, message) {
    if (!condition) {
      throw new AssertionFailure(message);
    }
  }

  describe(description) {
    // todo
  }

  // convenience function
  log(message) {
    this.logger.log(message);
  }
}
