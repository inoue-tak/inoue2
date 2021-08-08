$(function () {
    $("#search_btn").click(function () {

        event.preventDefault();

        // 入力された値を取得
        var zipcode = $('#search [name =zipcode]').val();

        // urlを設定
        var url = "https://zipcloud.ibsnet.co.jp/api/search";
        
        // 送るデータを成形する
        var param = { "zipcode": zipcode };
        
        // サーバーと通信(Ajax)
        $.ajax({
            type: "GET", 
            cache: false,
            data: param,
            url: url,
            dataType: "jsonp"
        })

        .done(function (res) {
            if (res.status != 200) {
                // 通信には成功。APIの結果がエラー
        
                // エラー内容を表示
                $('#zip_result').html(res.message);
            } else {

                // APIの結果も成功。結果が空の場合
                if(res.results === null){
                    $('#zip_result').html('郵便番号が存在しません。')


                // APIの結果も成功。結果にもデータが存在場合    
                }else{

                // 結果の配列をresultに定義し、配列からそれぞれの変数を定義
                var result = res.results;

                var address1 = result[0]['address1'];
                var address2 = result[0]['address2'];
                var address3 = result[0]['address3'];
                var kana1 = result[0]['kana1'];
                var kana2 = result[0]['kana2'];
                var kana3 = result[0]['kana3'];
                var prefcode = result[0]['prefcode'];
                var zipcode = result[0]['zipcode'];

     
                //住所を表示
                $('#zip_result').html(`

                都道府県コード:`+ prefcode +`<br>
                都道府県:`+ address1 +` <br>
                市区町村:`+ address2 +` <br>
                町域:`+ address3 +` <br>
                都道府県(カナ):`+ kana1 +` <br>
                市区町村(カナ):`+ kana2 +` <br>
                町域(カナ):`+ kana3 +` <br>        
                `);
                
                }
                
            }

        })
        .fail(function (error) {
            console.log(error);
            $('#zip_result').html("<p>通信エラーです。時間をおいてお試しください</p>");
        });
    });
});