'use-strict';

const hash = (string, max) => {
  let hash = 0;
  for (let i in string) {
    hash += string.charCodeAt(i);
  }
  return hash % max;
};

const HashTable = function () {

  let storage = [];
  const storageLimit = 14;
  
  this.print = () => {
    console.log('The whole hash table: ' + storage)
  }

  this.count = () => {
    console.log('Number of elements in the hash table: ' + storage.filter((a)=>{a === ''}));
  }

  this.insert = (key, value) => {
    let index = hash(key, storageLimit);
    if (storage[index] === undefined) {
      storage[index] = [
        [key, value]
      ];
    } else {
      let inserted = false;
      for (var i = 0; i < storage[index].length; i++) {
        if (storage[index][i][0] === key) {
          storage[index][i][1] = value;
          inserted = true;
        }
      }
      if (!inserted) {
        storage[index].push([key, value]);
      }
    }
  };

  this.remove = key => {
    var index = hash(key, storageLimit);
    if (storage[index].length === 1 && storage[index][0][0] === key) {
      delete storage[index];
    } else {
      for (var i = 0; i < storage[index].length; i++) {
        if (storage[index][i][0] === key) {
          delete storage[index][i];
        }
      }
    }
  };

  this.find = key => {
    var index = hash(key, storageLimit);
    if (storage[index] === undefined) {
      return undefined;
    } else {
      for (var i = 0; i < storage[index].length; i++) {
        if (storage[index][i][0] === key) {
          return storage[index][i][1];
        }
      }
    }
  };
};


console.log(hash('Apple', 10))

let hashTable = new HashTable();
hashTable.insert('Apple', 'Mobile');
hashTable.insert('Dell', 'Computer');
hashTable.insert('Tesla', 'Car');
hashTable.insert('Yamaha', 'Motocycle')
console.log(hashTable.remove('Tesla'))
hashTable.count();
hashTable.print();