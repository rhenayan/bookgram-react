const fetchBook = () => {
    return fetch(url)
    .then ((res) => res.json())
    .then ((data) => data)
};


const wrapPromise = promise => {
    let status = 'pending';
    let result;
    let suspender = promise.then(data => {
        status = 'success'
        result = data
    },err=> {
        status= 'error'
        result = err
    })

    return {
        read() {
            if (status === 'pending') throw suspender;
            else if (status === 'error') throw result
            else if (status === 'success') return result
        }
    }
}

export const fetchBookData = () => {
    return {
        data:wrapPromise(fetchBook()),
    }
}