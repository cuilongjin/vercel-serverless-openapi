let cookie = '.AspNet.ApplicationCookie=JBg8255LTW-S4p3HJR6cOg42Lr-ryV8631WaXERby_Ulxb2yWl2VFX3l5ONiHCI4rJgOyDjDJ7LHKQUfmgvIQmGRIJ-df3Bzk-SvUHytxRpYLD6nSFYc80klL782ddrBeh77-F1wJ1QY1QMhp91FwTJYTPA4kc7DA542nC1sAPtYQwzftpxT0Ai8h33A9PSzjtaYtYYHNHGSMZKw4lLPWXES_fbnhE22thd7lDCHyu09OM6nn13b9BMEMpjmCBwa557-T3kYqftAHwv1kkxzhE3TnvXnW7r5emPxt3yC_gW06yVfkah0d7Xx59PftrPm5jjoyy4jb5iMlOhoiMrFbDrok4XExRaxyFPiATC2ryd03uNWLxcE3G2BC85z7Pronh8jcedZZ2ZQzSfaFhv2yh16W5OjDyfr6D_a9lE-NgVhzvd8u1RMgbC-RzST51tBaNM7Q5Ji6QTGCYtqxpn3wEL0Vkhe3UDdtbbwLenMIm0lA_muSJ9JbqJn_U9XrAbOwMB72OR2s_j_KPhUzzmSZQ'

export default class db {
  constructor() {
  }

  set cookie(v) {
    cookie = v
  }
  get cookie() {
    return cookie
  }
}
