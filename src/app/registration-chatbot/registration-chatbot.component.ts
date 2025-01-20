import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../registration-admin/registration-admin.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-registration-chatbot',
  templateUrl: './registration-chatbot.component.html',
  styleUrls: ['./registration-chatbot.component.css']
})
export class RegistrationChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;
  chatVisible: boolean = false;
  registrationForm: FormGroup;
  formQuestions: any[] = [];
  currentQuestionIndex: number = 0;
  messages: any[] = [];
  userInput: string = '';
  isSpecialInput: boolean = false;
  isDropdown: boolean = false;
  isDateInput: boolean = false;
  currentOptions: any[] = [];
  selectedOption: any = '';
  selectedDate: Date = new Date();

  treatments: any[] = [];
  timeSlots: any[] = [];
  genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' }
  ];
  contactWhatsAppOptions = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' }
  ];
  
  // Flag to manage transition from greeting to questions
  initialGreetingDone: boolean = false;
  bookingSelected: boolean = false;

  constructor(private fb: FormBuilder, private registrationService: RegistrationService) {
    this.registrationForm = this.fb.group({
      usersName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact_number: ['', Validators.required],
      age: [''],
      date: ['', Validators.required],
      gender: [''],
      country_of_residence: [''],
      city: [''],
      visited: [''],
      allergy: [''],
      whatsupnumber: [''],
      contactwhatsup: [''],
      treatment: ['', Validators.required],
      timeSlot: ['', Validators.required]
    });

    this.formQuestions = [
      { label: "What's your name?", formControlName: "usersName" },
      { label: "What's your email address?", formControlName: "email" },
      { label: "What's your contact number?", formControlName: "contact_number" },
      { label: "What's your age?", formControlName: "age" },
      { label: "What's your gender?", formControlName: "gender", options: this.genderOptions, type: 'dropdown' },
      { label: "Which country do you live in?", formControlName: "country_of_residence" },
      { label: "Which city do you live in?", formControlName: "city" },
      { label: "Have you visited us before?", formControlName: "visited" },
      { label: "Do you have any allergies?", formControlName: "allergy" },
      { label: "What's your WhatsApp number?", formControlName: "whatsupnumber" },
      { label: "Can we contact you via WhatsApp?", formControlName: "contactwhatsup", options: this.contactWhatsAppOptions, type: 'dropdown' },
      { label: "Please select your preferred appointment date.", formControlName: "date", type: 'date' },
      { label: "Please select your treatment package.", formControlName: "treatment", options: this.treatments, type: 'dropdown' },
      { label: "Please select a time slot for your treatment.", formControlName: "timeSlot", options: this.timeSlots, type: 'dropdown' }
    ];
  }

  ngOnInit(): void {
    // Start the conversation with a salutation and initial question
    this.messages.push({ text: 'Hello! How can I assist you today? Please choose an option:', sender: 'bot' });
    this.messages.push({ text: '1. Booking\n2. Other', sender: 'bot' });

    // Flag to handle transition from initial greeting
    this.initialGreetingDone = false;
    this.bookingSelected = false;

    // Fetch treatments and update form questions options
    this.registrationService.getTreatments().subscribe(
      (data) => {
        this.treatments = data.map(t => ({ label: t.name, value: t.id, timeSlots: t.timeSlots }));
        this.formQuestions.find(q => q.formControlName === 'treatment').options = this.treatments;
      },
      (error) => {
        console.error('Error fetching treatments', error);
      }
    );

    // Handle changes to treatment selection
    this.registrationForm.get('treatment')?.valueChanges.subscribe(treatmentId => {
      if (treatmentId) {
        const selectedTreatment = this.treatments.find(t => t.value === treatmentId);
        if (selectedTreatment) {
          this.timeSlots = selectedTreatment.timeSlots.map((ts: any) => ({ label: `${ts.startTime} - ${ts.endTime}`, value: ts.id }));
          this.formQuestions.find(q => q.formControlName === 'timeSlot').options = this.timeSlots;
        }
      }
    });
  }

  toggleChat() {
    this.chatVisible = !this.chatVisible;
    if (this.chatVisible && this.messageContainer) {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    }
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom', err);
    }
  }

  handleUserInput(): void {
    if (this.userInput.trim() !== '') {
      this.messages.push({ text: this.userInput, sender: 'user' });
  
      if (!this.initialGreetingDone) {
        // Check user's response to the initial greeting
        if (this.userInput === '1') {
          this.bookingSelected = true;
          this.initialGreetingDone = true;
          this.currentQuestionIndex = 0;
          this.messages.push({ text: this.formQuestions[this.currentQuestionIndex].label, sender: 'bot' });
        } else if (this.userInput === '2') {
          this.messages.push({ text: 'Please call +1 672 972 52 85 or mail HarithaKeralaAyurveda @gmail.com for quick assistance.', sender: 'bot' });
          this.initialGreetingDone = false;
          this.bookingSelected = false;
          this.currentQuestionIndex = 0;
          this.messages.push({ text: 'How can I further help you? Please choose an option:', sender: 'bot' });
          this.messages.push({ text: '1. Booking\n2. Other\n3. Exit', sender: 'bot' });
        } else if (this.userInput === '3') {
          this.messages.push({ text: 'Thank you Have a great day.', sender: 'bot' });
          this.initialGreetingDone = false;
          this.bookingSelected = false;
          // Optionally, you may want to clear messages and reset form here
        } else {
          this.messages.push({ text: 'I didn\'t quite catch that. Please choose an option:\n1. Booking\n2. Other\n3. Exit', sender: 'bot' });
        }
      } else if (this.bookingSelected) {
        // Process the form responses
        this.registrationForm.get(this.formQuestions[this.currentQuestionIndex].formControlName)?.setValue(this.userInput);
        this.userInput = '';
        this.nextQuestion();
        setTimeout(() => this.scrollToBottom(), 0);
      }
    }
  }
  



  handleSpecialInput(): void {
    if (this.isDropdown) {
      this.messages.push({ text: this.currentOptions.find(option => option.value === this.selectedOption).label, sender: 'user' });
      this.registrationForm.get(this.formQuestions[this.currentQuestionIndex].formControlName)?.setValue(this.selectedOption);
    } else if (this.isDateInput) {
      const formattedDate = format(this.selectedDate, 'MMMM d, yyyy');
      this.messages.push({ text: formattedDate, sender: 'user' });
      this.registrationForm.get(this.formQuestions[this.currentQuestionIndex].formControlName)?.setValue(this.selectedDate);
    }
    this.nextQuestion();
    setTimeout(() => this.scrollToBottom(), 0);
  }

  nextQuestion(): void {
    this.isSpecialInput = false;
    this.isDropdown = false;
    this.isDateInput = false;

    if (this.currentQuestionIndex < this.formQuestions.length - 1) {
      this.currentQuestionIndex++;
      const currentQuestion = this.formQuestions[this.currentQuestionIndex];
      this.messages.push({ text: currentQuestion.label, sender: 'bot' });

      if (currentQuestion.type === 'dropdown') {
        this.isSpecialInput = true;
        this.isDropdown = true;
        this.currentOptions = currentQuestion.options;
      } else if (currentQuestion.type === 'date') {
        this.isSpecialInput = true;
        this.isDateInput = true;
      }
    } else {
      this.submitForm();
      // After form submission, reset to initial state for next interaction
      
    }
  }

  submitForm(): void {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      
      const treatmentControl = this.registrationForm.get('treatment');
      const timeSlotControl = this.registrationForm.get('timeSlot');
      
      if (treatmentControl && timeSlotControl) {
        formData.treatmentId = treatmentControl.value;
        formData.timeSlotId = timeSlotControl.value;
      }
      
      this.registrationService.register(formData).subscribe(
        response => {
          console.log('Registration successful', response);
          
         
        },
        error => {
          // Swal.fire('Sorry...', 'Fill mandatory fields!', 'error');
          console.log(error);
    
        }
      );








      const selectedTreatment = this.treatments.find(t => t.value === formData.treatment);
      const selectedTimeSlot = this.timeSlots.find(ts => ts.value === formData.timeSlot);
      const formattedDate = format(new Date(formData.date), 'MMMM d, yyyy');
      const userEmail = formData.email;
      const adminEmail = 'ashnapaularackal@gmail.com';
      const subject = 'Booking Confirmation';
      const text = `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h1 style="color: green;">Haritha Kerala Ayurveda and Yoga Centre</h1>
          <p>Dear ${formData.usersName},</p>
          <p>Thank you for booking an appointment with Haritha Kerala Ayurveda and Yoga Centre. Here are your booking details:</p>
          <ul>
            <li><strong>Name:</strong> ${formData.usersName}</li>
            <li><strong>Email:</strong> ${formData.email}</li>
            <li><strong>Contact Number:</strong> ${formData.contact_number}</li>
            <li><strong>Age:</strong> ${formData.age}</li>
            <li><strong>Gender:</strong> ${formData.gender}</li>
            <li><strong>Country:</strong> ${formData.country_of_residence}</li>
            <li><strong>City:</strong> ${formData.city}</li>
            <li><strong>Visited Before:</strong> ${formData.visited}</li>
            <li><strong>Allergies:</strong> ${formData.allergy}</li>
            <li><strong>WhatsApp Number:</strong> ${formData.whatsupnumber}</li>
            <li><strong>Contact via WhatsApp:</strong> ${formData.contactwhatsup}</li>
            <li><strong>Date:</strong> ${formattedDate}</li>
            <li><strong>Treatment Package:</strong> ${selectedTreatment ? selectedTreatment.label : 'N/A'}</li>
            <li><strong>Time Slot:</strong> ${selectedTimeSlot ? selectedTimeSlot.label : 'N/A'}</li>
          </ul>
          <p>We look forward to serving you.</p>
          <p>Best regards,<br>Haritha Kerala Ayurveda and Yoga Centre</p>
        </div>
      `;
      this.registrationService.sendEmail(userEmail, adminEmail, subject, text).subscribe(
        (response) => {
          this.messages.push({ text: 'Thank you for completing the registration! Your appointment details have been sent to your email.', sender: 'bot' });
          this.initialGreetingDone = false;
      this.bookingSelected = false;
      this.currentQuestionIndex = 0;
      this.messages.push({ text: 'How can I further help you ? Please choose an option:', sender: 'bot' });
      this.messages.push({ text: '1. Booking\n2. Other\n3. Exit', sender: 'bot' });
        },
        (error) => {
          this.messages.push({ text: 'Thank you for completing the registration! Your appointment details have been sent to your email.', sender: 'bot' });
          this.initialGreetingDone = false;
          this.bookingSelected = false;
          this.currentQuestionIndex = 0;
          this.messages.push({ text: 'How can I further help you ? Please choose an option:', sender: 'bot' });
          this.messages.push({ text: '1. Booking\n2. Other\n3. Exit', sender: 'bot' });
        }
      );
    
    }
  }
}
