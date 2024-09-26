document.getElementById('testForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Ngăn chặn form tự động nộp

    // Thu thập tất cả các câu trả lời
    let answers = {};
    const formData = new FormData(this);

    for (let [key, value] of formData.entries()) {
        answers[key] = value;
    }

    // Kiểm tra xem người dùng đã trả lời hết chưa
    const unansweredQuestions = Object.values(answers).filter((value) => value === '').length;

    if (unansweredQuestions > 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Cảnh báo',
            text: 'Vui lòng trả lời tất cả các câu hỏi!',
            confirmButtonText: 'OK',
        });
    } else {
        // Đếm số câu trả lời theo các mức độ
        let thinhThoangCount = 0;
        let khongThanhVanDeCount = 0;
        let hauHetThoiGianCount = 0;
        let khaThuongXuyenCount = 0;
        const totalQuestions = Object.keys(answers).length;

        // Phân loại các câu trả lời
        for (let key in answers) {
            switch (answers[key]) {
                case 'Thỉnh thoảng':
                    thinhThoangCount++;
                    break;
                case 'Không thành vấn đề':
                    khongThanhVanDeCount++;
                    break;
                case 'Hầu hết thời gian':
                    hauHetThoiGianCount++;
                    break;
                case 'Khá thường xuyên':
                    khaThuongXuyenCount++;
                    break;
            }
        }

        // Tính tỉ lệ các loại câu trả lời
        let thinhThoangPercentage = (thinhThoangCount / totalQuestions) * 100;
        let khongThanhVanDePercentage = (khongThanhVanDeCount / totalQuestions) * 100;
        let hauHetThoiGianPercentage = (hauHetThoiGianCount / totalQuestions) * 100;
        let khaThuongXuyenPercentage = (khaThuongXuyenCount / totalQuestions) * 100;

        // Xử lý kết quả
        if (thinhThoangPercentage > 60) {
            Swal.fire({
                title: 'Kết quả',
                text: 'Chúc mừng! Bạn không bị rối loạn thần kinh thực vật.',
                imageUrl: 'images/good.png', // Icon mặt vui
                imageWidth: 100,
                imageHeight: 100,
                confirmButtonText: 'OK',
            });
        } else if ((thinhThoangPercentage + khongThanhVanDePercentage) > 60) {
            Swal.fire({
                title: 'Kết quả',
                text: 'Chúc mừng! Bạn không bị rối loạn thần kinh thực vật.',
                imageUrl: 'image/good.png', // Icon mặt vui
                imageWidth: 100,
                imageHeight: 100,
                confirmButtonText: 'OK',
            });
        } else if ((hauHetThoiGianPercentage + khaThuongXuyenPercentage) > 60) {
            Swal.fire({
                title: 'Kết quả',
                text: 'Bạn đang có những triệu chứng của rối loạn thần kinh thực vật.',
                imageUrl: 'image/illness.png', // Icon mặt buồn
                imageWidth: 100,
                imageHeight: 100,
                confirmButtonText: 'OK',
            });
        } else {
            Swal.fire({
                title: 'Kết quả',
                text: 'Hãy chọn các đáp án trắc nghiệm để hoàn thành bài test',
                imageUrl: 'image/mental.png', // Icon mặt vui hoặc buồn tùy chọn
                imageWidth: 100,
                imageHeight: 100,
                confirmButtonText: 'OK',
            });
        }
    }
});
