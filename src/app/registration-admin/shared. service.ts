export class SharedService {
  private userData: any = {};

  setUserData(data: any) {
    this.userData = { ...this.userData, ...data };
  }

  getUserEmail(): string {
    return this.userData.email;
  }

  getUserName(): string {
    return this.userData.usersName;
  }

  getSelectedPackage(): string {
    return this.userData.selectedPackage;
  }

  getAge(): number {
    return this.userData.age;
  }

  getContactNumber(): string {
    return this.userData.contact_number;
  }

  getGender(): string {
    return this.userData.gender;
  }

  getNationality(): string {
    return this.userData.nationality;
  }

  getCountryOfResidence(): string {
    return this.userData.country_of_residence;
  }

  getCity(): string {
    return this.userData.city;
  }

  getVisited(): string {
    return this.userData.visited;
  }

  getAllergy(): string {
    return this.userData.allergy;
  }

  getWhatsupNumber(): string {
    return this.userData.whatsupnumber;
  }

  getContactWhatsup(): string {
    return this.userData.contactwhatsup;
  }

  getDate(): Date | null {
    return this.userData.date ? new Date(this.userData.date) : null;
  }

  getTimeSlot(): any {
    return this.userData.timeSlot;
  }
}