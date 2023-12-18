export default class Driver {
  driver_name: string;
  driver_age: string;

  constructor(name: string, age: string) {
    this.driver_age = age;
    this.driver_name = name;
  }
  addLogbook(): void {
    // TODO: calls the database that creates the new function
  }
  deleteDriver_details(): boolean {
    return false;
  }

  /**
   *
   * @returns object - containing all the details of that driver
   */
  get_details(): object {
    return {};
  }
  set_details(): void {}

  async saveToDb(): Promise<boolean> {
    const postData = await fetch("localhost:3000", {
      method: "POST",
      body: JSON.stringify({
        name: this.driver_name,
        age: this.driver_age,
      }),
    });

    this.addLogbook();

    return true;
  }
}
