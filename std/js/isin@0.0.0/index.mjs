export default
  (key, object)=>
    typeof object === 'object' ? key in object : false