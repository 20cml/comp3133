query{
  w1: welcome
  w2: welcome 
  
  u0: user{
    fnm
    lnm
  }
  
  u1: user{
    ...UserFields
  }
  u2: user{
    ...UserFields
  }
  u3: user{
    uid
    fnm
    lnm
    salary
  }
}

mutation{
    addUser(uid:1, fnm:"Camila", lnm:"Lee", salary: 100.50){
        uid
        fnm
        lnm
        salary
    }
}

fragment UserFields on User{
  fnm 
  lnm
}

mutation{
    u1: addUser(uid:1, fnm:"Camila", lnm:"Lee", salary: 100.50){
        uid
        fnm
        lnm
        salary
    }

    u2: addUser(uid:1, fnm:"Jessica", lnm:"Lee", salary: 500.50){
        uid
        fnm
        lnm
        salary
    }
}