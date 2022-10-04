import React from 'react'

export default function Form({handleSubmit, value, setValue}) { // handleSubmit은 함수 안에서 쓰는 state값이 있으므로 그냥 함수로 건내 받는게 낫다.

  const handleChange = (e) => {
    // console.log('e',e.target)    // event 확인용
    setValue(e.target.value) // value에 타이핑 내용 삽입
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex pt-2">
          <input
            type="text"
            name="value"
            className='w-full px-3 py2 mr-4 text-gray-500 border roudned shadow'
            placeholder="해야할 일을 입력해주세요."
            value={value}
            onChange={handleChange}
          />
          <input
            type="submit"
            value="입력"
            className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-200"
          />
        </form>
    </div>
  )
}
