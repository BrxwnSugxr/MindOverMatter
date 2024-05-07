export const validateImage = (file) => {
  if (file) {
    const sizeInKB = file.size / 1024;
    const sizeInMB = sizeInKB / 1024;
    if (sizeInMB.toFixed() > 1) {
      return 'Please upload image of maximum 1MB Size.';
    } else if (!['image/jpg', 'image/jpeg', 'image/png'].includes(file.type)) {
      return 'Please upload image of only png, jpg and jpeg format.';
    } else {
      return '';
    }
  }
};
