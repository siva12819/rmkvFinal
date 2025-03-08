export class DateValidation {
    validateDate(model:any, model1:any, minDate:any, maxDate:any): any {
      let Array = model.split('');
      let FirsLetter = Array[0];
      let SecondLetter = Array[1];
      let ThirdLetter = Array[2];
      let FourthLetter = Array[3];
      let FifthLetter = Array[4];
      let SixthLetter = Array[5];
      let SeventhLetter = Array[6];
      let EightLetter = Array[7];
      let NinethLetter = Array[8];
      let TenthLetter = Array[9];
      let EleventhLetter = Array[10];
      model1 = "";
      if (FirsLetter == '/') {
        // window.alert("You cannot Type First Letter as /");
        model = "";
        model1 = "";
        return [model, model1];
      }
      if (SecondLetter) {
  
      }
      else {
        return [model, model1];
      }
      if (SecondLetter) {
        if (Number(FirsLetter + SecondLetter) > 31) {
          // window.alert("You cannot Type greater than 31");
          model = FirsLetter;
          model1 = "";
          return [model, model1];
        }
        if (SecondLetter == '/') {
          if (FirsLetter == 0) {
            // window.alert("You cannot Type / after 0");
            model = FirsLetter;
            model1 = "";
            return [model, model1];
          }
          else {
            model = "0" + FirsLetter + "/";
            model1 = "";
            return [model, model1];
          }
        }
        if (Number(FirsLetter) == 0 && Number(SecondLetter) == 0) {
          // window.alert("day cannot be 00");
          model = "";
          model1 = "";
          return [model, model1];
        }
      }
      if (ThirdLetter) {
  
      }
      else {
        return [model, model1];
      }
      if (ThirdLetter) {
        if (ThirdLetter == '/') {
        }
        else {
          model = FirsLetter + SecondLetter + "/" + ThirdLetter;
          model1 = "";
          return [model, model1];
        }
      }
      if (FourthLetter) {
  
      }
      else {
        return [model, model1];
      }
      if (FourthLetter) {
        if (FourthLetter == "/") {
          // window.alert("You cannot Type /");
          model = FirsLetter + SecondLetter + ThirdLetter;
          model1 = "";
          return [model, model1];
        }
      }
      if (FifthLetter) {
  
      }
      else {
        return [model, model1];
      }
      if (FifthLetter) {
        if (Number(FourthLetter + FifthLetter) > 12) {
          // window.alert("You cannot Type month greater than 12");
          model = FirsLetter + SecondLetter + ThirdLetter + FourthLetter;
          model1 = "";
          return [model, model1];
        }
        if (FifthLetter == "/") {
          if (FourthLetter == "0") {
            // window.alert("You cannot Type / after 0");
            model = FirsLetter + SecondLetter + ThirdLetter + FourthLetter;
            model1 = "";
            return [model, model1];
          }
          else {
            model = FirsLetter + SecondLetter + ThirdLetter + "0" + FourthLetter + "/";
            model1 = "";
            return [model, model1];
          }
        }
        if (Number(FourthLetter) == 0 && Number(FifthLetter) == 0) {
          // window.alert("month cannot be 00");
          model = FirsLetter + SecondLetter + ThirdLetter + FourthLetter;
          model1 = "";
          return [model, model1];
        }
      }
      if (SixthLetter) {
  
      }
      else {
        return [model, model1];
      }
      if (SixthLetter) {
        if (SixthLetter == "/") {
  
        }
        else {
          model = FirsLetter + SecondLetter + ThirdLetter + FourthLetter + FifthLetter + "/" + SixthLetter;
          model1 = "";
          return [model, model1];
        }
      }
      if (SeventhLetter) {
  
      }
      else {
        return [model, model1];
      }
      if (SeventhLetter) {
        if (SeventhLetter == "/") {
          // window.alert("You Cannot type /");
          model = FirsLetter + SecondLetter + ThirdLetter + FourthLetter + FifthLetter + SixthLetter;
          model1 = "";
          return [model, model1];
        }
      }
      if (EightLetter) {
  
      }
      else {
        return [model, model1];
      }
      if (EightLetter) {
        if (EightLetter == "/") {
          // window.alert("You Cannot type /");
          model = FirsLetter + SecondLetter + ThirdLetter + FourthLetter + FifthLetter + SixthLetter + SeventhLetter;
          model1 = "";
          return [model, model1];
        }
      }
      if (NinethLetter) {
  
      }
      else {
        return [model, model1];
      }
      if (NinethLetter) {
        if (NinethLetter == "/") {
          // window.alert("You Cannot type /");
          model = FirsLetter + SecondLetter + ThirdLetter + FourthLetter + FifthLetter + SixthLetter + SeventhLetter + EightLetter;
          model1 = "";
          return [model, model1];
        }
      }
      if (TenthLetter) {
  
      }
      else {
        return [model, model1];
      }
      if (TenthLetter) {
        if (TenthLetter == "/") {
          // window.alert("You Cannot type /");
          model = FirsLetter + SecondLetter + ThirdLetter + FourthLetter + FifthLetter + SixthLetter + SeventhLetter + EightLetter + NinethLetter;
          model1 = "";
          return [model, model1];
        }
        var days: Number = this.daysInMonth(Number(FourthLetter + FifthLetter), Number(SeventhLetter + EightLetter + NinethLetter + TenthLetter));
        if (Number(FirsLetter + SecondLetter) <= +days) {
          var curDate = this.toDate(FirsLetter + SecondLetter + ThirdLetter + FourthLetter + FifthLetter + SixthLetter + SeventhLetter + EightLetter + NinethLetter + TenthLetter);
          var mincheck = this.toDate(minDate);
          var maxcheck = this.toDate(maxDate);
          if (curDate < mincheck) {
            // window.alert("Date is Less than Minimum Date");
            model = "";
            model1 = "";
            return [model, model1];
          }
          if (curDate > maxcheck) {
            // window.alert("Date Exceeds Maximum Date");
            model = "";
            model1 = "";
            return [model, model1]
          }
        }
        else {
          // window.alert("Your Entered " + Number(FirsLetter + SecondLetter) + " ,Please Enter Below " + days);
          let EndDay = days.toString().split("");
          model = EndDay[0] + EndDay[1] + "/" + FourthLetter + FifthLetter + "/" + SeventhLetter + EightLetter + NinethLetter + TenthLetter;
          model1 = this.toDate(EndDay[0] + EndDay[1] + "/" + FourthLetter + FifthLetter + "/" + SeventhLetter + EightLetter + NinethLetter + TenthLetter);
          return [model, model1];
        }
        model1 = this.toDate(FirsLetter + SecondLetter + "/" + FourthLetter + FifthLetter + "/" + SeventhLetter + EightLetter + NinethLetter + TenthLetter)
      }
      if (EleventhLetter) {
  
      }
      else {
        return [model, model1];
      }
      if (EleventhLetter) {
        model = FirsLetter + SecondLetter + ThirdLetter + FourthLetter + FifthLetter + SixthLetter + SeventhLetter + EightLetter + NinethLetter + TenthLetter;
        model1 = this.toDate(FirsLetter + SecondLetter + "/" + FourthLetter + FifthLetter + "/" + SeventhLetter + EightLetter + NinethLetter + TenthLetter)
        return [model, model1];
      }
  
    }
  
    validateDateTo(model:any, model1:any, minDate:any, maxDate:any, FromDate:any): any {
      let Array = model.split('');
      let FirsLetter = Array[0];
      let SecondLetter = Array[1];
      let ThirdLetter = Array[2];
      let FourthLetter = Array[3];
      let FifthLetter = Array[4];
      let SixthLetter = Array[5];
      let SeventhLetter = Array[6];
      let EightLetter = Array[7];
      let NinethLetter = Array[8];
      let TenthLetter = Array[9];
      let EleventhLetter = Array[10];
      model1 = "";
      if (FirsLetter == '/') {
        // window.alert("You cannot Type First Letter as /");
        model = "";
        model1 = "";
        return [model, model1];
      }
      if (SecondLetter) {
  
      }
      else {
        return [model, model1];
      }
      if (SecondLetter) {
        if (Number(FirsLetter + SecondLetter) > 31) {
          // window.alert("You cannot Type greater than 31");
          model = FirsLetter;
          model1 = "";
          return [model, model1];
        }
        if (SecondLetter == '/') {
          if (FirsLetter == 0) {
            // window.alert("You cannot Type / after 0");
            model = FirsLetter;
            model1 = "";
            return [model, model1];
          }
          else {
            model = "0" + FirsLetter + "/";
            model1 = "";
            return [model, model1];
          }
        }
        if (Number(FirsLetter) == 0 && Number(SecondLetter) == 0) {
          // window.alert("day cannot be 00");
          model = "";
          model1 = "";
          return [model, model1];
        }
      }
      if (ThirdLetter) {
  
      }
      else {
        return [model, model1];
      }
      if (ThirdLetter) {
        if (ThirdLetter == '/') {
        }
        else {
          model = FirsLetter + SecondLetter + "/" + ThirdLetter;
          model1 = "";
          return [model, model1];
        }
      }
      if (FourthLetter) {
  
      }
      else {
        return [model, model1];
      }
      if (FourthLetter) {
        if (FourthLetter == "/") {
          // window.alert("You cannot Type /");
          model = FirsLetter + SecondLetter + ThirdLetter;
          model1 = "";
          return [model, model1];
        }
      }
      if (FifthLetter) {
  
      }
      else {
        return [model, model1];
      }
      if (FifthLetter) {
        if (Number(FourthLetter + FifthLetter) > 12) {
          // window.alert("You cannot Type month greater than 12");
          model = FirsLetter + SecondLetter + ThirdLetter + FourthLetter;
          model1 = "";
          return [model, model1];
        }
        if (FifthLetter == "/") {
          if (FourthLetter == "0") {
            // window.alert("You cannot Type / after 0");
            model = FirsLetter + SecondLetter + ThirdLetter + FourthLetter;
            model1 = "";
            return [model, model1];
          }
          else {
            model = FirsLetter + SecondLetter + ThirdLetter + "0" + FourthLetter + "/";
            model1 = "";
            return [model, model1];
          }
        }
        if (Number(FourthLetter) == 0 && Number(FifthLetter) == 0) {
          // window.alert("month cannot be 00");
          model = FirsLetter + SecondLetter + ThirdLetter + FourthLetter;
          model1 = "";
          return [model, model1];
        }
      }
      if (SixthLetter) {
  
      }
      else {
        return [model, model1];
      }
      if (SixthLetter) {
        if (SixthLetter == "/") {
  
        }
        else {
          model = FirsLetter + SecondLetter + ThirdLetter + FourthLetter + FifthLetter + "/" + SixthLetter;
          model1 = "";
          return [model, model1];
        }
      }
      if (SeventhLetter) {
  
      }
      else {
        return [model, model1];
      }
      if (SeventhLetter) {
        if (SeventhLetter == "/") {
          // window.alert("You Cannot type /");
          model = FirsLetter + SecondLetter + ThirdLetter + FourthLetter + FifthLetter + SixthLetter;
          model1 = "";
          return [model, model1];
        }
      }
      if (EightLetter) {
  
      }
      else {
        return [model, model1];
      }
      if (EightLetter) {
        if (EightLetter == "/") {
          // window.alert("You Cannot type /");
          model = FirsLetter + SecondLetter + ThirdLetter + FourthLetter + FifthLetter + SixthLetter + SeventhLetter;
          model1 = "";
          return [model, model1];
        }
      }
      if (NinethLetter) {
  
      }
      else {
        return [model, model1];
      }
      if (NinethLetter) {
        if (NinethLetter == "/") {
          // window.alert("You Cannot type /");
          model = FirsLetter + SecondLetter + ThirdLetter + FourthLetter + FifthLetter + SixthLetter + SeventhLetter + EightLetter;
          model1 = "";
          return [model, model1];
        }
      }
      if (TenthLetter) {
  
      }
      else {
        return [model, model1];
      }
      if (TenthLetter) {
        if (TenthLetter == "/") {
          // window.alert("You Cannot type /");
          model = FirsLetter + SecondLetter + ThirdLetter + FourthLetter + FifthLetter + SixthLetter + SeventhLetter + EightLetter + NinethLetter;
          model1 = "";
          return [model, model1];
        }
        var days: Number = this.daysInMonth(Number(FourthLetter + FifthLetter), Number(SeventhLetter + EightLetter + NinethLetter + TenthLetter));
        if (Number(FirsLetter + SecondLetter) <= +days) {
          var curDate = this.toDate(FirsLetter + SecondLetter + ThirdLetter + FourthLetter + FifthLetter + SixthLetter + SeventhLetter + EightLetter + NinethLetter + TenthLetter);
          var mincheck = this.toDate(minDate);
          var maxcheck = this.toDate(maxDate);
          if (curDate < mincheck) {
            // window.alert("Date is Less than Minimum Date");
            model = "";
            model1 = "";
            return [model, model1];
          }
          if (curDate > maxcheck) {
            // window.alert("Date Exceeds Maximum Date");
            model = "";
            model1 = "";
            return [model, model1]
          }
          if (FromDate > curDate) {
            // window.alert("Date Exceeds Maximum Date");
            model = "";
            model1 = "";
            window.alert("Todate is less than from date");
            return [model, model1]
          }
        }
        else {
          // window.alert("Your Entered " + Number(FirsLetter + SecondLetter) + " ,Please Enter Below " + days);
          let EndDay = days.toString().split("");
          model = EndDay[0] + EndDay[1] + "/" + FourthLetter + FifthLetter + "/" + SeventhLetter + EightLetter + NinethLetter + TenthLetter;
          model1 = this.toDate(EndDay[0] + EndDay[1] + "/" + FourthLetter + FifthLetter + "/" + SeventhLetter + EightLetter + NinethLetter + TenthLetter);
          return [model, model1];
        }
        model1 = this.toDate(FirsLetter + SecondLetter + "/" + FourthLetter + FifthLetter + "/" + SeventhLetter + EightLetter + NinethLetter + TenthLetter)
      }
      if (EleventhLetter) {
  
      }
      else {
        return [model, model1];
      }
      if (EleventhLetter) {
        model = FirsLetter + SecondLetter + ThirdLetter + FourthLetter + FifthLetter + SixthLetter + SeventhLetter + EightLetter + NinethLetter + TenthLetter;
        model1 = this.toDate(FirsLetter + SecondLetter + "/" + FourthLetter + FifthLetter + "/" + SeventhLetter + EightLetter + NinethLetter + TenthLetter)
        return [model, model1];
      }
  
    }
  
    validateDateFrom(model:any, model1:any, minDate:any, maxDate:any, ToDate:any): any {
      let Array = model.split('');
      let FirsLetter = Array[0];
      let SecondLetter = Array[1];
      let ThirdLetter = Array[2];
      let FourthLetter = Array[3];
      let FifthLetter = Array[4];
      let SixthLetter = Array[5];
      let SeventhLetter = Array[6];
      let EightLetter = Array[7];
      let NinethLetter = Array[8];
      let TenthLetter = Array[9];
      let EleventhLetter = Array[10];
      model1 = "";
      if (FirsLetter == '/') {
        // window.alert("You cannot Type First Letter as /");
        model = "";
        model1 = "";
        return [model, model1];
      }
      if (SecondLetter) {
  
      }
      else {
        return [model, model1];
      }
      if (SecondLetter) {
        if (Number(FirsLetter + SecondLetter) > 31) {
          // window.alert("You cannot Type greater than 31");
          model = FirsLetter;
          model1 = "";
          return [model, model1];
        }
        if (SecondLetter == '/') {
          if (FirsLetter == 0) {
            // window.alert("You cannot Type / after 0");
            model = FirsLetter;
            model1 = "";
            return [model, model1];
          }
          else {
            model = "0" + FirsLetter + "/";
            model1 = "";
            return [model, model1];
          }
        }
        if (Number(FirsLetter) == 0 && Number(SecondLetter) == 0) {
          // window.alert("day cannot be 00");
          model = "";
          model1 = "";
          return [model, model1];
        }
      }
      if (ThirdLetter) {
  
      }
      else {
        return [model, model1];
      }
      if (ThirdLetter) {
        if (ThirdLetter == '/') {
        }
        else {
          model = FirsLetter + SecondLetter + "/" + ThirdLetter;
          model1 = "";
          return [model, model1];
        }
      }
      if (FourthLetter) {
  
      }
      else {
        return [model, model1];
      }
      if (FourthLetter) {
        if (FourthLetter == "/") {
          // window.alert("You cannot Type /");
          model = FirsLetter + SecondLetter + ThirdLetter;
          model1 = "";
          return [model, model1];
        }
      }
      if (FifthLetter) {
  
      }
      else {
        return [model, model1];
      }
      if (FifthLetter) {
        if (Number(FourthLetter + FifthLetter) > 12) {
          // window.alert("You cannot Type month greater than 12");
          model = FirsLetter + SecondLetter + ThirdLetter + FourthLetter;
          model1 = "";
          return [model, model1];
        }
        if (FifthLetter == "/") {
          if (FourthLetter == "0") {
            // window.alert("You cannot Type / after 0");
            model = FirsLetter + SecondLetter + ThirdLetter + FourthLetter;
            model1 = "";
            return [model, model1];
          }
          else {
            model = FirsLetter + SecondLetter + ThirdLetter + "0" + FourthLetter + "/";
            model1 = "";
            return [model, model1];
          }
        }
        if (Number(FourthLetter) == 0 && Number(FifthLetter) == 0) {
          // window.alert("month cannot be 00");
          model = FirsLetter + SecondLetter + ThirdLetter + FourthLetter;
          model1 = "";
          return [model, model1];
        }
      }
      if (SixthLetter) {
  
      }
      else {
        return [model, model1];
      }
      if (SixthLetter) {
        if (SixthLetter == "/") {
  
        }
        else {
          model = FirsLetter + SecondLetter + ThirdLetter + FourthLetter + FifthLetter + "/" + SixthLetter;
          model1 = "";
          return [model, model1];
        }
      }
      if (SeventhLetter) {
  
      }
      else {
        return [model, model1];
      }
      if (SeventhLetter) {
        if (SeventhLetter == "/") {
          // window.alert("You Cannot type /");
          model = FirsLetter + SecondLetter + ThirdLetter + FourthLetter + FifthLetter + SixthLetter;
          model1 = "";
          return [model, model1];
        }
      }
      if (EightLetter) {
  
      }
      else {
        return [model, model1];
      }
      if (EightLetter) {
        if (EightLetter == "/") {
          // window.alert("You Cannot type /");
          model = FirsLetter + SecondLetter + ThirdLetter + FourthLetter + FifthLetter + SixthLetter + SeventhLetter;
          model1 = "";
          return [model, model1];
        }
      }
      if (NinethLetter) {
  
      }
      else {
        return [model, model1];
      }
      if (NinethLetter) {
        if (NinethLetter == "/") {
          // window.alert("You Cannot type /");
          model = FirsLetter + SecondLetter + ThirdLetter + FourthLetter + FifthLetter + SixthLetter + SeventhLetter + EightLetter;
          model1 = "";
          return [model, model1];
        }
      }
      if (TenthLetter) {
  
      }
      else {
        return [model, model1];
      }
      if (TenthLetter) {
        if (TenthLetter == "/") {
          // window.alert("You Cannot type /");
          model = FirsLetter + SecondLetter + ThirdLetter + FourthLetter + FifthLetter + SixthLetter + SeventhLetter + EightLetter + NinethLetter;
          model1 = "";
          return [model, model1];
        }
        var days: Number = this.daysInMonth(Number(FourthLetter + FifthLetter), Number(SeventhLetter + EightLetter + NinethLetter + TenthLetter));
        if (Number(FirsLetter + SecondLetter) <= +days) {
          var curDate = this.toDate(FirsLetter + SecondLetter + ThirdLetter + FourthLetter + FifthLetter + SixthLetter + SeventhLetter + EightLetter + NinethLetter + TenthLetter);
          var mincheck = this.toDate(minDate);
          var maxcheck = this.toDate(maxDate);
          if (curDate < mincheck) {
            // window.alert("Date is Less than Minimum Date");
            model = "";
            model1 = "";
            return [model, model1];
          }
          if (curDate > maxcheck) {
            // window.alert("Date Exceeds Maximum Date");
            model = "";
            model1 = "";
            return [model, model1]
          }
          if (curDate > ToDate) {
            model = "";
            model1 = "";
            window.alert("FromDate Less then ToDate");
            return [model, model1]
          }
        }
        else {
          // window.alert("Your Entered " + Number(FirsLetter + SecondLetter) + " ,Please Enter Below " + days);
          let EndDay = days.toString().split("");
          model = EndDay[0] + EndDay[1] + "/" + FourthLetter + FifthLetter + "/" + SeventhLetter + EightLetter + NinethLetter + TenthLetter;
          model1 = this.toDate(EndDay[0] + EndDay[1] + "/" + FourthLetter + FifthLetter + "/" + SeventhLetter + EightLetter + NinethLetter + TenthLetter);
          return [model, model1];
        }
        model1 = this.toDate(FirsLetter + SecondLetter + "/" + FourthLetter + FifthLetter + "/" + SeventhLetter + EightLetter + NinethLetter + TenthLetter)
      }
      if (EleventhLetter) {
  
      }
      else {
        return [model, model1];
      }
      if (EleventhLetter) {
        model = FirsLetter + SecondLetter + ThirdLetter + FourthLetter + FifthLetter + SixthLetter + SeventhLetter + EightLetter + NinethLetter + TenthLetter;
        model1 = this.toDate(FirsLetter + SecondLetter + "/" + FourthLetter + FifthLetter + "/" + SeventhLetter + EightLetter + NinethLetter + TenthLetter)
        return [model, model1];
      }
  
    }
  
    daysInMonth(month:any, year:any) {
      return new Date(year, month, 0).getDate();
    }
  
    toDate(dateStr:any) {
      var parts = dateStr.split("/")
      return new Date(parts[2], parts[1] - 1, parts[0])
    }
  
  
    numberOnly(event:any): boolean {
      const charCode = (event.which) ? event.which : event.keyCode;
      // console.log("char",charCode);
      if (charCode > 31 && (charCode < 47 || charCode > 57)) {
        return false;
      }
      return true;
  
    }
  
    toFormattedDate(iso: string) {
      const date = new Date(iso);
      console.log(date);
      return this._to2digit(date.getDate()).toString() + "/" + this._to2digit(date.getMonth() + 1).toString() + "/" + this._to4digit(date.getFullYear()).toString()
    }
  
    private _to2digit(n: number) {
      return ('00' + n).slice(-2);
    }
  
    private _to4digit(n: number) {
      return ('0000' + n).slice(-4);
    }
  }