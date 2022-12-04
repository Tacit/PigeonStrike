using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerScript : MonoBehaviour {

    public Vector2 speed = new Vector2(1, 1);
    bool IsOnGround = false;
    Vector2 movement = new Vector2(0, 0);
    float angle = 0;

	// Use this for initialization
	void Start () {
	}
	
	// Update is called once per frame
	void Update () {
        float inputX = Input.GetAxis("Horizontal");
        float inputY = Input.GetAxis("Vertical");
        movement = new Vector2(
            speed.x * inputX,
            speed.y * inputY
            );
	}

    private void FixedUpdate()
    {
        GetComponent<Rigidbody2D>().velocity = movement;
        var transform = GetComponent<Transform>();
        var sr = GetComponent<SpriteRenderer>();

        if (!sr.flipX && Mathf.Sign(movement.x) < 0)
        {
            sr.flipX = true;
        } else if (sr.flipX  && Mathf.Sign(movement.x) > 0 )
        {
            sr.flipX = false;
        }

        angle = 15 * movement.y;
        angle *= !sr.flipX ? 1 : -1;
        transform.eulerAngles = new Vector3(0,0,angle);
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        if (!IsOnGround)
        {
            var anim = GetComponent<Animator>();
            anim.enabled = false;
            
            IsOnGround = true;
        }
    }

    private void OnCollisionExit2D(Collision2D collision)
    {
        if (IsOnGround)
        {
            
            IsOnGround = false;
            var anim = GetComponent<Animator>();
            anim.enabled = true;
        }
    }
}
